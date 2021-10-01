import type { ClientsConfig, ServiceContext, RecorderState } from '@vtex/api'
import { LRUCache, method, Service } from '@vtex/api'

import { Clients } from './clients'
import { productScoreMiddleware } from './middlewares/productScoreMiddleware'
import { getProductMiddleware } from './middlewares/getProductMiddleware'
import { getCatalogMiddleware } from './middlewares/getCatalogMiddleware'
import { validateMiddleware } from './middlewares/validateMiddleware'
import { catalogScoreMiddleware } from './middlewares/catalogScoreMiddleware'
import type {
  ResponseCategory,
  ResponseProduct,
} from './clients/scoreRestClient'

const TIMEOUT_MS = 600000

const memoryCache = new LRUCache<string, any>({ max: 1 })

metrics.trackCache('status', memoryCache)

const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      timeout: TIMEOUT_MS,
    },
    status: {
      memoryCache,
    },
  },
}

declare global {
  type Context = ServiceContext<Clients, State>

  interface State extends RecorderState {
    validatedBody: BodyRequest[]
    products: ResponseProduct[]
    catalogs: any
  }

  interface BodyRequest {
    id: number
    score: number
  }

  interface BodyResponse {
    id: number
    score: number
    success: string
    error?: number
    errorMessage?: string
  }

  interface ResponseManager {
    updateResponse: BodyResponse[]
    responseProduct: ResponseProduct[]
    responseCategory: ResponseCategory[]
    errors429: BodyResponse[]
  }
}

export default new Service({
  clients,
  routes: {
    product: method({
      PUT: [validateMiddleware, getProductMiddleware, productScoreMiddleware],
    }),
    catalog: method({
      PUT: [validateMiddleware, getCatalogMiddleware, catalogScoreMiddleware],
    }),
  },
})

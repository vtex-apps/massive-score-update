import type { ClientsConfig, ServiceContext, RecorderState } from '@vtex/api'
import { LRUCache, method, Service } from '@vtex/api'

import { Clients } from './clients'
import { productScoreMiddleware } from './middlewares/productScoreMiddleware'
import { getProductMiddleware } from './middlewares/getProductMiddleware'
import { getCatalogMiddleware } from './middlewares/getCatalogMiddleware'
import { validateMiddleware } from './middlewares/validateMiddleware'
import { catalogScoreMiddleware } from './middlewares/catalogScoreMiddleware'
import type {
  BodyRequest,
  ResponseCategory,
  ResponseProduct,
} from './interfaces'

const TIMEOUT_MS = 600000

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    catalogs: ResponseCategory[]
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

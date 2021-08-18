import type { ClientsConfig, ServiceContext, RecorderState } from '@vtex/api'
import { LRUCache, method, Service } from '@vtex/api'

import { Clients } from './clients'
import { productScoreMiddleware } from './middlewares/productScoreMiddleware'
import { validateMiddleware } from './middlewares/validateMiddleware'
import { catalogScoreMiddleware } from './middlewares/catalogScoreMiddleware'

const TIMEOUT_MS = 800

// Create a LRU memory cache for the Status client.
// The @vtex/api HttpClient respects Cache-Control headers and uses the provided cache.
const memoryCache = new LRUCache<string, any>({ max: 5000 })

metrics.trackCache('status', memoryCache)

// This is the configuration for clients available in `ctx.clients`.
const clients: ClientsConfig<Clients> = {
  // We pass our custom implementation of the clients bag, containing the Status client.
  implementation: Clients,
  options: {
    // All IO Clients will be initialized with these options, unless otherwise specified.
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
    // This key will be merged with the default options and add this cache to our Status client.
    status: {
      memoryCache,
    },
  },
}

declare global {
  // We declare a global Context type just to avoid re-writing ServiceContext<Clients, State> in every handler and resolver
  type Context = ServiceContext<Clients, State>

  // The shape of our State object found in `ctx.state`. This is used as state bag to communicate between middlewares.
  interface State extends RecorderState {
    validatedBody: UpdateRequest[]
  }

  interface UpdateRequest {
    id: number | string
    name: string
    categoryId?: number | string
    brandId?: number | string
    score: number | string
  }

  interface UpdateResponse {
    id?: number | string
    name?: string
    categoryId?: number | string
    brandId?: number | string
    score?: number | string
    success: string
    error?: string
    errorMessage?: string
  }
}

// Export a service that defines route handlers and client options.
export default new Service({
  clients,
  routes: {
    product: method({
      PUT: [validateMiddleware, productScoreMiddleware],
    }),
    catalog: method({
      PUT: [validateMiddleware, catalogScoreMiddleware],
    }),
  },
})

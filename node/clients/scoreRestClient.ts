import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

import type { Body } from '../middlewares/scoreMiddleware'

export default class ScoreRestClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(`http://${context.account}.vtexcommercestable.com.br`, context, {
      ...options,
      headers: {
        VtexIdClientAutCookie:
          context.storeUserAuthToken ??
          context.adminUserAuthToken ??
          context.authToken ??
          '',
        'Content-Type': 'application/json; charset=utf-8',
        Accept: 'application/json',
      },
    })
  }

  public async updateProductScore(
    body: Body,
    productId: number | string
  ): Promise<UpdateProductScoreResponse> {
    return this.http.put(`/api/catalog/pvt/product/${productId}`, body)
  }
}

export interface UpdateProductScoreResponse {
  Id: number
  Name: string
  CategoryId: number
  Score: number
}

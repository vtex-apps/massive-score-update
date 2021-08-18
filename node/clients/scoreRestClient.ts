import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class ScoreRestClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(`https://${context.account}.vtexcommercestable.com.br`, context, {
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

  public async productScoreUpdate(
    body: UpdateRequest,
    productId: number | string
  ): Promise<UpdateResponseProductScore> {
    return this.http.put(`/api/catalog/pvt/product/${productId}`, {
      name: body.name,
      categoryId: body.categoryId,
      brandId: body.brandId,
      score: body.score,
    })
  }

  public async catalogScoreUpdate(
    body: UpdateRequest,
    catalogId: number | string
  ): Promise<UpdateResponseCatalogScore> {
    return this.http.put(`/api/catalog/pvt/category/${catalogId}`, {
      name: body.name,
      score: body.score,
    })
  }
}

export interface UpdateResponseProductScore {
  Id: number
  Name: string
  CategoryId: number
  BrandId: number
  Score: number
}

export interface UpdateResponseCatalogScore {
  Id: number
  Name: string
  Score: number
}

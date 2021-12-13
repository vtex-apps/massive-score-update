import type { InstanceOptions, IOContext } from '@vtex/api'
import { JanusClient } from '@vtex/api'

import type {
  ResponseCategory,
  ResponseProduct,
  ScoreUpdateResponse,
} from '../interfaces'

export default class ScoreRestClient extends JanusClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, {
      ...options,
      headers: {
        VtexIdClientAutCookie: context.authToken ?? '',
        'Content-Type': 'application/json; charset=utf-8',
        Accept: 'application/json',
      },
    })
  }

  // eslint-disable-next-line max-params
  public async productScoreUpdate(
    body: ResponseProduct,
    score: number | string,
    authToken: string,
    appKey: string,
    appToken: string
  ): Promise<ScoreUpdateResponse> {
    const url = `http://${this.context.account}.vtexcommercestable.com.br/api/catalog/pvt/product/${body.Id}`

    const headers =
      authToken !== ''
        ? {
            headers: {
              VtexIdclientAutCookie: authToken,
            },
          }
        : {
            headers: {
              'X-VTEX-API-AppKey': appKey,
              'X-VTEX-API-AppToken': appToken,
            },
          }

    return this.http.put(
      url,
      {
        Name: body.Name,
        DepartmentId: body.DepartmentId,
        CategoryId: body.CategoryId,
        BrandId: body.BrandId,
        LinkId: body.LinkId,
        RefId: body.RefId,
        IsVisible: body.IsVisible,
        Description: body.Description,
        DescriptionShort: body.DescriptionShort,
        ReleaseDate: body.ReleaseDate,
        KeyWords: body.KeyWords,
        Title: body.Title,
        IsActive: body.IsActive,
        TaxCode: body.TaxCode,
        MetaTagDescription: body.MetaTagDescription,
        SupplierId: body.SupplierId,
        ShowWithoutStock: body.ShowWithoutStock,
        AdWordsRemarketingCode: body.AdWordsRemarketingCode,
        LomadeeCampaignCode: body.LomadeeCampaignCode,
        Score: score,
      },
      headers
    )
  }

  // eslint-disable-next-line max-params
  public async catalogScoreUpdate(
    body: ResponseCategory,
    score: number | string,
    authToken: string,
    appKey: string,
    appToken: string
  ): Promise<ScoreUpdateResponse> {
    const url = `http://${this.context.account}.vtexcommercestable.com.br/api/catalog/pvt/category/${body.Id}`

    const headers =
      authToken !== ''
        ? {
            headers: {
              VtexIdclientAutCookie: authToken,
            },
          }
        : {
            headers: {
              'X-VTEX-API-AppKey': appKey,
              'X-VTEX-API-AppToken': appToken,
            },
          }

    return this.http.put(
      url,
      {
        Name: body.Name,
        FatherCategoryId: body.FatherCategoryId,
        Title: body.Title,
        Description: body.Description,
        Keywords: body.Keywords,
        IsActive: body.IsActive,
        LomadeeCampaignCode: body.LomadeeCampaignCode,
        AdWordsRemarketingCode: body.AdWordsRemarketingCode,
        ShowInStoreFront: body.ShowInStoreFront,
        ShowBrandFilter: body.ShowBrandFilter,
        ActiveStoreFrontLink: body.ActiveStoreFrontLink,
        GlobalCategoryId: body.GlobalCategoryId,
        StockKeepingUnitSelectionMode: body.StockKeepingUnitSelectionMode,
        Score: score,
        LinkId: body.LinkId,
        HasChildren: body.HasChildren,
      },
      headers
    )
  }

  // eslint-disable-next-line max-params
  public async getCategory(
    catalogId: number | string,
    authToken: string,
    appKey: string,
    appToken: string
  ): Promise<ResponseCategory> {
    const url = `http://${this.context.account}.vtexcommercestable.com.br/api/catalog/pvt/category/${catalogId}`

    const headers =
      authToken !== ''
        ? {
            headers: {
              VtexIdclientAutCookie: authToken,
            },
          }
        : {
            headers: {
              'X-VTEX-API-AppKey': appKey,
              'X-VTEX-API-AppToken': appToken,
            },
          }

    return this.http.get(url, headers)
  }

  // eslint-disable-next-line max-params
  public async getProduct(
    productId: number | string,
    authToken: string,
    appKey: string,
    appToken: string
  ): Promise<ResponseProduct> {
    const url = `http://${this.context.account}.vtexcommercestable.com.br/api/catalog/pvt/product/${productId}`

    const headers =
      authToken !== ''
        ? {
            headers: {
              VtexIdclientAutCookie: authToken,
            },
          }
        : {
            headers: {
              'X-VTEX-API-AppKey': appKey,
              'X-VTEX-API-AppToken': appToken,
            },
          }

    return this.http.get(url, headers)
  }
}

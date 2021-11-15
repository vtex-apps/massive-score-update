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

  public async productScoreUpdate(
    body: ResponseProduct,
    score: number | string,
    authToken: string
  ): Promise<ScoreUpdateResponse> {
    return this.http.put(
      `http://${this.context.account}.vtexcommercestable.com.br/api/catalog/pvt/product/${body.Id}`,
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
      {
        headers: {
          VtexIdclientAutCookie: authToken,
        },
      }
    )
  }

  public async catalogScoreUpdate(
    body: ResponseCategory,
    score: number | string,
    authToken: string
  ): Promise<ScoreUpdateResponse> {
    return this.http.put(
      `http://${this.context.account}.vtexcommercestable.com.br/api/catalog/pvt/category/${body.Id}`,
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
      {
        headers: {
          VtexIdclientAutCookie: authToken,
        },
      }
    )
  }

  public async getCategory(
    catalogId: number | string,
    authToken: string
  ): Promise<ResponseCategory> {
    return this.http.get(
      `http://${this.context.account}.vtexcommercestable.com.br/api/catalog/pvt/category/${catalogId}`,
      {
        headers: {
          VtexIdclientAutCookie: authToken,
        },
      }
    )
  }

  public async getProduct(
    productId: number | string,
    authToken: string
  ): Promise<ResponseProduct> {
    return this.http.get(
      `http://${this.context.account}.vtexcommercestable.com.br/api/catalog/pvt/product/${productId}`,
      {
        headers: {
          VtexIdclientAutCookie: authToken,
        },
      }
    )
  }
}

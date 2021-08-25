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
    body: ResponseProduct,
    score: number | string
  ): Promise<ScoreUpdateResponse> {
    return this.http.put(`/api/catalog/pvt/product/${body.Id}`, {
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
    })
  }

  public async catalogScoreUpdate(
    body: ResponseCategory,
    score: number | string
  ): Promise<ScoreUpdateResponse> {
    return this.http.put(`/api/catalog/pvt/category/${body.Id}`, {
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
    })
  }

  public async getCategory(
    catalogId: number | string
  ): Promise<ResponseCategory> {
    return this.http.get(`/api/catalog/pvt/category/${catalogId}`)
  }

  public async getProduct(
    productId: number | string
  ): Promise<ResponseProduct> {
    return this.http.get(`/api/catalog/pvt/product/${productId}`)
  }
}
export interface ScoreUpdateResponse {
  Id: number
  Score: number
}

export interface ResponseCategory {
  Id: number
  Name: string
  FatherCategoryId: number
  Title: string
  Description: string
  Keywords: string
  IsActive: boolean
  LomadeeCampaignCode: string
  AdWordsRemarketingCode: string
  ShowInStoreFront: boolean
  ShowBrandFilter: boolean
  ActiveStoreFrontLink: boolean
  GlobalCategoryId: number
  StockKeepingUnitSelectionMode: string
  Score: number
  LinkId: string
  HasChildren: boolean
}

export interface ResponseProduct {
  Id: number
  Name: string
  DepartmentId: number
  CategoryId: number
  BrandId: number
  LinkId: string
  RefId: string
  IsVisible: boolean
  Description: string
  DescriptionShort: string
  ReleaseDate: string
  KeyWords: string
  Title: string
  IsActive: boolean
  TaxCode: string
  MetaTagDescription: string
  SupplierId: number
  ShowWithoutStock: boolean
  AdWordsRemarketingCode: string
  LomadeeCampaignCode: string
  Score: number
}

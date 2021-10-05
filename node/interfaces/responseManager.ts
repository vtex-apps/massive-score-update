import type { BodyResponse, ResponseCategory, ResponseProduct } from '.'

export interface ResponseManager {
  updateResponse: BodyResponse[]
  responseProduct: ResponseProduct[]
  responseCategory: ResponseCategory[]
  errors429: BodyResponse[]
}

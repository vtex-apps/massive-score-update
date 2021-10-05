import { BodyResponse, ResponseCategory, ResponseProduct, ResponseManager } from "../../interfaces";

export const operation = async (
  ctx: Context,
  responseManager: ResponseManager,
  id: number,
  score: number,
  operation: string
): Promise<void> => {
  try {
  const { clients:{
    scoreRestClient
  }} = ctx

    if(operation === "getProduct"){
      const product: ResponseProduct = await scoreRestClient.getProduct(id)
      responseManager.responseProduct.push(product)

    }

    if(operation === 'getCategory'){
      const catalog: ResponseCategory = await scoreRestClient.getCategory(id)
      responseManager.responseCategory.push(catalog)
    }

    if(operation === 'updateCategory'){
      const category = responseManager.responseCategory.find(
        (category: ResponseCategory) => category.Id === id)

      if(category){
        const scoreGraphQLClientResponse =
          await scoreRestClient.catalogScoreUpdate(category, score)

        const categoryMiddlewareResponse: BodyResponse = {
          id: scoreGraphQLClientResponse.Id,
          score: scoreGraphQLClientResponse.Score,
          success: 'true',
        }
        responseManager.updateResponse.push(categoryMiddlewareResponse)

      } else {
        throw new Error('404')
      }
    }

    if(operation === 'updateProduct'){
      const product = responseManager.responseProduct.find(
        (product: ResponseProduct) => product.Id === id)

      if (product) {
        const scoreGraphQLClientResponse =
          await scoreRestClient.productScoreUpdate(product, score)

        const productMiddlewareResponse: BodyResponse = {
          id: scoreGraphQLClientResponse.Id,
          score: scoreGraphQLClientResponse.Score,
          success: 'true',
        }

        responseManager.updateResponse.push(productMiddlewareResponse)
      } else {
        throw new Error('404')
      }
    }
  } catch (error) {
    const data = error.response ? error.response.data : ''
    const restClientErrorResponse: BodyResponse = {
      id,
      success: 'false',
      score,
      error: error.response ? error.response.status : 500,
      errorMessage: data.error ? data.error.message : data,
    }

    if (error.response && error.response.status === 429) {
      restClientErrorResponse.errorMessage = error.response
        ? error.response.headers['ratelimit-reset']
        : '0'
      responseManager.errors429.push(restClientErrorResponse)
    }

    responseManager.updateResponse.push(restClientErrorResponse)
  }
}

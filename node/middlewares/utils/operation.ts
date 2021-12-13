import type {
  BodyResponse,
  ResponseCategory,
  ResponseProduct,
  ResponseManager,
} from '../../interfaces'

export const operation = async (
  ctx: Context,
  responseManager: ResponseManager,
  id: number,
  score: number,
  task: string
  // eslint-disable-next-line max-params
): Promise<void> => {
  try {
    const {
      clients: { scoreRestClient },
    } = ctx

    const vtexIdToken = ctx.get('VtexIdclientAutCookie') ?? ''
    const appKey = ctx.get('X-VTEX-API-AppKey') ?? ''
    const appToken = ctx.get('X-VTEX-API-AppToken') ?? ''

    if (task === 'getProduct') {
      const product: ResponseProduct = await scoreRestClient.getProduct(
        id,
        vtexIdToken,
        appKey,
        appToken
      )

      responseManager.responseProduct.push(product)
    }

    if (task === 'getCategory') {
      const catalog: ResponseCategory = await scoreRestClient.getCategory(
        id,
        vtexIdToken,
        appKey,
        appToken
      )

      responseManager.responseCategory.push(catalog)
    }

    if (task === 'updateCategory') {
      const catalog = responseManager.responseCategory.find(
        (category: ResponseCategory) => category.Id === id
      )

      if (catalog) {
        const scoreGraphQLClientResponse =
          await scoreRestClient.catalogScoreUpdate(
            catalog,
            score,
            vtexIdToken,
            appKey,
            appToken
          )

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

    if (task === 'updateProduct') {
      const product = responseManager.responseProduct.find(
        (elem: ResponseProduct) => elem.Id === id
      )

      if (product) {
        const scoreGraphQLClientResponse =
          await scoreRestClient.productScoreUpdate(
            product,
            score,
            vtexIdToken,
            appKey,
            appToken
          )

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

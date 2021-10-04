import type { BodyResponse, ResponseManager } from '../interfaces'
import { buildErrorServiceResponse, buildResponse } from './utils'

export async function productScoreMiddleware(
  ctx: Context,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  next: () => Promise<any>
) {
  const {
    state: { products, validatedBody },
    clients: { scoreRestClient },
  } = ctx

  const responseManager: ResponseManager = {
    updateResponse: [],
    responseProduct: products,
    responseCategory: [],
    errors429: [],
  }

  async function updateScore(id: number, score: number): Promise<void> {
    try {
      const product = responseManager.responseProduct.find((p) => {
        return p.Id === id
      })

      if (product) {
        const scoreGraphQLClientResponse =
          await scoreRestClient.productScoreUpdate(product, score)

        const productMiddlewareResponse: BodyResponse = {
          id: scoreGraphQLClientResponse.Id,
          score: scoreGraphQLClientResponse.Score,
          success: 'true',
        }

        responseManager.updateResponse.push(productMiddlewareResponse)
      }

      throw new Error('404')
    } catch (error) {
      const data = error.response ? error.response.data : ''
      const updateScoreRestClientErrorResponse = {
        id,
        success: 'false',
        score,
        error: error.response ? error.response.status : 429,
        errorMessage: data.error ? data.error.message : data,
      }

      if (error.response && error.response.status === 429) {
        updateScoreRestClientErrorResponse.errorMessage = error.response
          ? error.response.headers['ratelimit-reset']
          : ''
        responseManager.errors429.push(updateScoreRestClientErrorResponse)
      }

      responseManager.updateResponse.push(updateScoreRestClientErrorResponse)
    }
  }

  async function myOperations(): Promise<void> {
    await retryCall()
  }

  async function retryCall(): Promise<true | void> {
    if (responseManager.errors429.length >= 1) {
      const retryList = responseManager.errors429
      let value = '0'

      for (const index in retryList) {
        const response = retryList[index]

        if (response.errorMessage && response.errorMessage > value) {
          value = response.errorMessage
        }

        if (value === '0') {
          value = '20'
        }
      }

      const awaitTimeout = (delay: string) =>
        new Promise((resolve) => setTimeout(resolve, parseFloat(delay) * 1000))

      await awaitTimeout(value)

      // eslint-disable-next-line no-console
      console.log(
        'UpdateResponse antes de la limpieza',
        responseManager.updateResponse
      )

      responseManager.errors429 = []

      // eslint-disable-next-line no-console
      console.log(
        'UpdateResponse despues de la limpieza',
        responseManager.updateResponse
      )
      await Promise.all(
        retryList.map(async (elem) => {
          const { id, score } = elem

          return updateScore(id, score)
        })
      )

      return myOperations()
    }

    return true
  }

  try {
    await Promise.all(
      validatedBody.map(async (elem) => {
        const { id, score } = elem

        return updateScore(id, score)
      })
    )
    await myOperations()

    buildResponse(responseManager, ctx)

    await next()
  } catch (error) {
    buildErrorServiceResponse(error, ctx)
    await next()
  }
}

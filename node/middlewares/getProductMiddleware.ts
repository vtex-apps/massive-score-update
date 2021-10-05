import type {
  BodyResponse,
  ResponseManager,
  ResponseProduct,
} from '../interfaces'
import {
  buildErrorResponse,
  buildServiceErrorResponse,
  getTimeOutDefault,
  sleep,
} from './utils'

export async function getProductMiddleware(
  ctx: Context,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  next: () => Promise<any>
) {
  const {
    state: { validatedBody },
    clients: { scoreRestClient },
  } = ctx

  const responseManager: ResponseManager = {
    updateResponse: [],
    responseProduct: [],
    responseCategory: [],
    errors429: [],
  }

  async function getProduct(id: number, score: number): Promise<void> {
    try {
      const product: ResponseProduct = await scoreRestClient.getProduct(id)

      responseManager.responseProduct.push(product)
    } catch (error) {
      const data = error.response ? error.response.data : ''
      const productRestClientErrorResponse: BodyResponse = {
        id,
        success: 'false',
        score,
        error: error.response ? error.response.status : 500,
        errorMessage: data.error ? data.error.message : data,
      }

      if (error.response && error.response.status === 429) {
        productRestClientErrorResponse.errorMessage = error.response
          ? error.response.headers['ratelimit-reset']
          : '0'
        responseManager.errors429.push(productRestClientErrorResponse)
      }

      responseManager.updateResponse.push(productRestClientErrorResponse)
    }
  }

  async function retryCall(): Promise<true | void> {
    if (responseManager.errors429.length >= 1) {
      let value = '0'

      const retryList = responseManager.errors429

      for (const index in responseManager.errors429) {
        const errorResponse = responseManager.errors429[index]

        if (errorResponse.errorMessage && errorResponse.errorMessage > value) {
          value = errorResponse.errorMessage
        }
      }

      if (value === '0') {
        value = await getTimeOutDefault(ctx, value)
      }

      await sleep(value)

      responseManager.errors429 = []

      await Promise.all(
        retryList.map(async (item) => {
          const { id, score } = item

          return getProduct(id, score)
        })
      )

      return myOperations()
    }

    return true
  }

  async function myOperations(): Promise<void> {
    await retryCall()
  }

  try {
    await Promise.all(
      validatedBody.map(async (request) => {
        const { id, score } = request

        return getProduct(id, score)
      })
    )

    if (responseManager.updateResponse.length >= 1) {
      buildErrorResponse(responseManager, ctx)

      return
    }

    await myOperations()

    ctx.state.products = responseManager.responseProduct
    await next()
  } catch (error) {
    buildServiceErrorResponse(error, ctx)
  }
}

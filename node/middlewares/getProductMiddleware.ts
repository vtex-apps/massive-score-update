import type {
  BodyRequest,
  BodyResponse,
  ResponseManager,
  ResponseProduct,
} from '../interfaces'
import { buildErrorResponse, buildErrorServiceResponse } from './utils'

export async function getProductMiddleware(
  ctx: Context,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  next: () => Promise<any>
) {
  // eslint-disable-next-line no-console
  console.log('Entro al getProductMiddleware')
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

  async function getProduct(updateRequest: BodyRequest): Promise<void> {
    const { id, score } = updateRequest

    try {
      const product: ResponseProduct = await scoreRestClient.getProduct(id)

      responseManager.responseProduct.push(product)
    } catch (error) {
      const data = error.response ? error.response.data : ''
      const productRestClientErrorResponse: BodyResponse = {
        id,
        success: 'false',
        score,
        error: error.response ? error.response.status : 429,
        errorMessage: data.error ? data.error.message : data,
      }

      if (error.response && error.response.status === 429) {
        productRestClientErrorResponse.errorMessage = error.response
          ? error.response.headers['ratelimit-reset']
          : ''
        responseManager.errors429.push(productRestClientErrorResponse)
      }

      responseManager.updateResponse.push(productRestClientErrorResponse)
    }
  }

  async function retryCall(): Promise<true | void> {
    const retryList: BodyRequest[] = []
    let value = '0'

    if (responseManager.errors429.length >= 1) {
      for (const index in responseManager.errors429) {
        const errorResponse = responseManager.errors429[index]

        if (errorResponse.errorMessage && errorResponse.errorMessage > value) {
          value = errorResponse.errorMessage
        }

        if (value === '0') {
          value = '20' // TODO: hacerlo parametrizable
        }

        retryList.push({
          id: errorResponse.id,
          score: errorResponse.score,
        })
      }
    }

    if (retryList.length >= 1) {
      const awaitTimeout = (delay: string) =>
        new Promise((resolve) => setTimeout(resolve, parseFloat(delay) * 1000))

      await awaitTimeout(value)

      // eslint-disable-next-line no-console
      console.log(
        'UpdateResponse antes de la limpieza',
        responseManager.updateResponse
      )
      /*    responseList.updateResponse = responseList.updateResponse.reduce(
        (acc: UpdateResponse[], curr) => {
          if (curr.error !== 429) {
            acc.push(curr)
          }

          return acc
        },
        []
      ) */
      responseManager.errors429 = []

      // eslint-disable-next-line no-console
      console.log(
        'UpdateResponse despues de la limpieza',
        responseManager.updateResponse
      )

      await Promise.all(
        retryList.map(async (item) => {
          return getProduct(item)
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
        return getProduct(request)
      })
    )

    if (responseManager.updateResponse.length >= 1) {
      buildErrorResponse(responseManager, ctx)

      return
    }

    await myOperations()

    // eslint-disable-next-line no-console
    console.log('updateResponse', responseManager.updateResponse)
    // eslint-disable-next-line no-console
    console.log('responseProduct', responseManager.responseProduct)
    // eslint-disable-next-line no-console
    console.log('errors429', responseManager.errors429)
    ctx.state.products = responseManager.responseProduct
    await next()
  } catch (error) {
    buildErrorServiceResponse(error, ctx)
  }
}

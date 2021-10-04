import type {
  BodyRequest,
  BodyResponse,
  ResponseCategory,
  ResponseManager,
} from '../interfaces'
import { buildErrorResponse, buildErrorServiceResponse } from './utils'

export async function getCatalogMiddleware(
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

  async function getCategory(updateRequest: BodyRequest): Promise<void> {
    const { id, score } = updateRequest

    try {
      const category: ResponseCategory = await scoreRestClient.getCategory(id)

      responseManager.responseCategory.push(category)
    } catch (error) {
      const data = error.response ? error.response.data : ''
      const categoryRestClientErrorResponse: BodyResponse = {
        id,
        success: 'false',
        score,
        error: error.response ? error.response.status : 429,
        errorMessage: data.error ? data.error.message : data,
      }

      if (error.response && error.response.status === 429) {
        categoryRestClientErrorResponse.errorMessage = error.response
          ? error.response.headers['ratelimit-reset']
          : ''
        responseManager.errors429.push(categoryRestClientErrorResponse)
      }

      responseManager.updateResponse.push(categoryRestClientErrorResponse)
    }
  }

  async function myOperations(): Promise<void> {
    await retryCall()
  }

  async function retryCall(): Promise<true | void> {
    const retryList: BodyRequest[] = []
    let value = '0'

    if (responseManager.errors429.length >= 1) {
      for (const index in responseManager.errors429) {
        const response = responseManager.errors429[index]

        if (response.errorMessage && response.errorMessage > value) {
          value = response.errorMessage
        }

        if (value === '0') {
          value = '20'
        }

        retryList.push({
          id: response.id,
          score: response.score,
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

      responseManager.errors429 = []

      // eslint-disable-next-line no-console
      console.log(
        'UpdateResponse despues de la limpieza',
        responseManager.updateResponse
      )

      await Promise.all(
        retryList.map(async (item) => {
          return getCategory(item)
        })
      )

      return myOperations()
    }

    return true
  }

  try {
    await Promise.all(
      validatedBody.map(async (arg) => {
        return getCategory(arg)
      })
    )
    await myOperations()

    if (responseManager.updateResponse.length >= 1) {
      buildErrorResponse(responseManager, ctx)

      return
    }

    ctx.state.catalogs = responseManager.responseCategory
    await next()
  } catch (error) {
    buildErrorServiceResponse(error, ctx)
  }
}

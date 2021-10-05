import type {
  BodyResponse,
  ResponseCategory,
  ResponseManager,
} from '../interfaces'
import {
  buildErrorResponse,
  buildServiceErrorResponse,
  getTimeOutDefault,
  sleep,
} from './utils'

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

  async function getCategory(id: number, score: number): Promise<void> {
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
          : '0'
        responseManager.errors429.push(categoryRestClientErrorResponse)
      }

      responseManager.updateResponse.push(categoryRestClientErrorResponse)
    }
  }

  async function myOperations(): Promise<void> {
    await retryCall()
  }

  async function retryCall(): Promise<true | void> {
    if (responseManager.errors429.length >= 1) {
      let value = '0'
      const retryList = responseManager.errors429

      for (const index in responseManager.errors429) {
        const response = responseManager.errors429[index]

        if (response.errorMessage && response.errorMessage > value) {
          value = response.errorMessage
        }
      }

      if (value === '0') {
        value = await getTimeOutDefault(ctx, value)
      }

      await sleep(value)

      responseManager.errors429 = []

      await Promise.all(
        retryList.map(async (elem) => {
          const { id, score } = elem

          return getCategory(id, score)
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

        return getCategory(id, score)
      })
    )

    if (responseManager.updateResponse.length >= 1) {
      buildErrorResponse(responseManager, ctx)

      return
    }

    await myOperations()

    ctx.state.catalogs = responseManager.responseCategory
    await next()
  } catch (error) {
    buildServiceErrorResponse(error, ctx)
  }
}

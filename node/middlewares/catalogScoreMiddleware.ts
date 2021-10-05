import type { BodyResponse, ResponseManager } from '../interfaces'
import {
  buildServiceErrorResponse,
  buildResponse,
  getTimeOutDefault,
  sleep,
} from './utils'

export async function catalogScoreMiddleware(
  ctx: Context,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  next: () => Promise<any>
) {
  const {
    state: { catalogs, validatedBody },
    clients: { scoreRestClient },
  } = ctx

  const responseManager: ResponseManager = {
    updateResponse: [],
    responseProduct: [],
    responseCategory: catalogs,
    errors429: [],
  }

  async function updateScore(id: number, score: number): Promise<void> {
    try {
      const category = responseManager.responseCategory.find((p) => {
        return p.Id === id
      })

      if (category) {
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

  async function retryCall() {
    if (responseManager.errors429.length >= 1) {
      const retryList = responseManager.errors429
      let value = '0'

      for (const index in retryList) {
        const response = retryList[index]

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
        retryList.map(async (item) => {
          const { id, score } = item

          return updateScore(id, score)
        })
      )

      return myOperations()
    }

    return true
  }

  try {
    await Promise.all(
      validatedBody.map(async (arg) => {
        const { id, score } = arg

        return updateScore(id, score)
      })
    )
    await myOperations()

    buildResponse(responseManager, ctx)

    await next()
  } catch (error) {
    buildServiceErrorResponse(error, ctx)
    await next()
  }
}

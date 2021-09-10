import type { ResponseCategory } from '../clients/scoreRestClient'

export async function catalogScoreMiddleware(
  ctx: Context,
  next: () => Promise<any>
) {
  const {
    state: { catalogs, validatedBody },
    clients: { scoreRestClient },
  } = ctx

  const responseList: UpdateResponse[] = []

  const categoriesFound: ResponseCategory[] = catalogs

  try {
    const expected = await operationRetry(
      await Promise.all(
        validatedBody.map(async (arg) => {
          return updateScore(arg)
        })
      )
    )

    if (expected) {
      const successfulResponses: UpdateResponse[] = responseList.filter((e) => {
        return e.success !== 'false'
      })

      const failedResponses: UpdateResponse[] = responseList.filter((e) => {
        return e.success === 'false'
      })

      ctx.status = 200
      ctx.body = {
        successfulResponses: {
          elements: successfulResponses,
          quantity: successfulResponses.length,
        },
        failedResponses: {
          elements: failedResponses,
          quantity: failedResponses.length,
        },
        total: responseList.length,
      }

      await next()
    }
  } catch (error) {
    ctx.status = 500
    ctx.body = error
    await next()
  }

  async function updateScore(
    updateRequest: UpdateRequest
  ): Promise<UpdateResponse> {
    const { id, score } = updateRequest

    try {
      const category = categoriesFound.find((p) => {
        return p.Id === id
      })

      if (category) {
        const scoreGraphQLClientResponse =
          await scoreRestClient.catalogScoreUpdate(category, score)

        const productMiddlewareResponse: UpdateResponse = {
          id: scoreGraphQLClientResponse.Id,
          score: scoreGraphQLClientResponse.Score,
          success: 'true',
        }

        return productMiddlewareResponse
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
      }

      return updateScoreRestClientErrorResponse
    }
  }

  async function operationRetry(
    updateResponseList: UpdateResponse[]
  ): Promise<any> {
    addResponsesSuccessfulUpdates(updateResponseList)

    const response = await findStoppedRequests(updateResponseList)

    return response
  }

  async function findStoppedRequests(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    responseList: UpdateResponse[]
  ): Promise<any> {
    const retryList: UpdateRequest[] = []
    let value = '0'

    if (responseList.length >= 1) {
      for (const index in responseList) {
        const response = responseList[index]

        if (response.error && response.error === 429) {
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
    }

    if (retryList.length >= 1) {
      let retryOperation: UpdateResponse[] = []

      const awaitTimeout = (delay: string) =>
        new Promise((resolve) => setTimeout(resolve, parseFloat(delay) * 1000))

      await awaitTimeout(value)

      retryOperation = await Promise.all(
        retryList.map(async (item) => {
          return updateScore(item)
        })
      )

      return operationRetry(retryOperation)
    }

    return true
  }

  function addResponsesSuccessfulUpdates(
    updateResponseList: UpdateResponse[]
  ): void {
    for (const index in updateResponseList) {
      const updateResponse = updateResponseList[index]

      if (updateResponse.error !== 429) {
        responseList.push(updateResponse)
      }
    }
  }
}

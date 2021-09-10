import type { ResponseCategory } from '../clients/scoreRestClient'

export async function getCatalogMiddleware(
  ctx: Context,
  next: () => Promise<any>
) {
  const {
    state: { validatedBody },
    clients: { scoreRestClient },
  } = ctx

  const responseList: UpdateResponse[] = []

  try {
    const expected = await operationRetry(
      await Promise.all(
        validatedBody.map(async (arg) => {
          return getProduct(arg)
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

      if (failedResponses.length >= 1) {
        ctx.status = 404
        ctx.body = {
          failedResponses: {
            elements: failedResponses,
            quantity: failedResponses.length,
          },
        }

        return
      }

      ctx.state.catalogs = successfulResponses
      await next()
    }
  } catch (error) {
    ctx.status = 500
    ctx.body = error
  }

  async function getProduct(updateRequest: UpdateRequest): Promise<any> {
    const { id, score } = updateRequest

    try {
      const category: ResponseCategory = await scoreRestClient.getCategory(id)

      return category
    } catch (error) {
      const data = error.response ? error.response.data : ''
      const categoryRestClientErrorResponse: UpdateResponse = {
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
      }

      return categoryRestClientErrorResponse
    }
  }

  async function operationRetry(updateResponseList: any[]): Promise<any> {
    addResponsesSuccessfulUpdates(updateResponseList)

    const response = await findStoppedRequests(updateResponseList)

    return response
  }

  async function findStoppedRequests(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    responseList: any[]
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
          return getProduct(item)
        })
      )

      return operationRetry(retryOperation)
    }

    return true
  }

  function addResponsesSuccessfulUpdates(updateResponseList: any[]): void {
    for (const index in updateResponseList) {
      const updateResponse = updateResponseList[index]

      if (updateResponse.error !== 429) {
        responseList.push(updateResponse)
      }
    }
  }
}

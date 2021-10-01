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

  async function updateScore(updateRequest: BodyRequest): Promise<void> {
    const { id, score } = updateRequest

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

  async function retryCall() {
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
          return updateScore(item)
        })
      )

      return myOperations()
    }

    return true
  }

  try {
    await Promise.all(
      validatedBody.map(async (arg) => {
        return updateScore(arg)
      })
    )
    await myOperations()

    const successfulResponses = responseManager.updateResponse.filter((e) => {
      return e.success !== 'false'
    })

    const failedResponses = responseManager.updateResponse.filter((e) => {
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
      total: responseManager.updateResponse.length,
    }

    await next()
  } catch (error) {
    ctx.status = 500
    ctx.body = error
    await next()
  }
}

export async function productScoreMiddleware(
  ctx: Context,
  next: () => Promise<any>
) {
  const {
    state: { validatedBody },
    clients: { scoreRestClient },
  } = ctx

  const responseList = await Promise.all(
    validatedBody.map(async (arg) => {
      return scoreUpdate(arg)
    })
  )

  const validate = responseList.filter((response) => {
    return response.success === 'true'
  })

  if (validate.length >= 1) {
    ctx.body = {
      responseList,
    }
    ctx.status = 200
  } else {
    ctx.body = {
      responseList,
    }
    ctx.status = 400
  }

  await next()

  async function scoreUpdate(arg: UpdateRequest): Promise<UpdateResponse> {
    const { id, score } = arg

    try {
      const product = await scoreRestClient.getProduct(id)
      const scoreGraphQLClientResponse =
        await scoreRestClient.productScoreUpdate(product, score)

      const productMiddlewareResponse: UpdateResponse = {
        id: scoreGraphQLClientResponse.Id,
        score: scoreGraphQLClientResponse.Score,
        success: 'true',
      }

      return productMiddlewareResponse
    } catch (error) {
      const productMiddlewareResponse = {
        id,
        score: arg.score,
        success: 'false',
        error: error.response.status,
        errorMessage: error.response.data,
      }

      return productMiddlewareResponse
    }
  }
}

export async function scoreMiddleware(ctx: Context, next: () => Promise<any>) {
  const {
    state: { validatedBody },
    clients: { scoreRestClient },
  } = ctx

  const responseList = await Promise.all(
    validatedBody.map(async (arg) => {
      return updateScore(arg)
    })
  )

  ctx.body = {
    message: responseList,
  }
  ctx.status = 200
  await next()

  async function updateScore(
    arg: ProductItem
  ): Promise<ProductMiddlewareResponse> {
    const { id, name, categoryId, brandId, score } = arg

    const requestBody: Body = {
      name,
      categoryId,
      brandId,
      score,
    }

    try {
      const scoreGraphQLClientResponse =
        await scoreRestClient.updateProductScore(requestBody, id)

      // eslint-disable-next-line no-console
      console.log('response:', scoreGraphQLClientResponse)
      const productMiddlewareResponse: ProductMiddlewareResponse = {
        id,
        name,
        categoryId,
        brandId,
        success: 'true',
      }

      return productMiddlewareResponse
    } catch (error) {
      const productMiddlewareResponse = {
        id,
        name,
        categoryId,
        brandId,
        success: 'false',
        error: error.response.status,
        errorMessage: error.response.data,
      }

      return productMiddlewareResponse
    }
  }
}

export type Body = {
  name: string
  categoryId: number | string
  brandId: number | string
  score: number | string
}

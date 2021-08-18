import { json } from 'co-body'
import { UserInputError } from '@vtex/api'

export async function validateMiddleware(
  ctx: Context,
  next: () => Promise<any>
) {
  const body = await json(ctx.req)
  const errorList: any[] = []

  function fieldValidator(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fields: UpdateRequest,
    path: boolean
  ): void {
    const elements: UpdateResponse[] = []

    const { id, name, categoryId, brandId, score } = fields

    if (!id) {
      elements.push({
        success: 'false',
        error: 'Request failed with status code 400',
        errorMessage: `The request is invalid:  The 'id' field is required.`,
      })
    }

    if (!name) {
      elements.push({
        success: 'false',
        error: 'Request failed with status code 400',
        errorMessage: `The request is invalid:  The 'name' field is required.`,
      })
    }

    if (!categoryId && path) {
      elements.push({
        success: 'false',
        error: 'Request failed with status code 400',
        errorMessage: `The request is invalid: The 'categoryId' field is required.`,
      })
    }

    if (!brandId && path) {
      elements.push({
        success: 'false',
        error: 'Request failed with status code 400',
        errorMessage: `The request is invalid: The 'brandId' field is required.`,
      })
    }

    if (!score) {
      elements.push({
        success: 'false',
        error: 'Request failed with status code 400',
        errorMessage: `The request is invalid: The 'score' field is required.`,
      })
    }

    if (elements.length >= 1) {
      errorList.push(elements)
    }
  }

  try {
    const endpointIdentifier = ctx.url.includes('product/score')

    for (const product of body) {
      fieldValidator(product, endpointIdentifier)
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    throw new UserInputError(error)
  }

  if (errorList.length >= 1) {
    ctx.status = 400
    ctx.response.body = {
      errorList,
    }

    return
  }

  ctx.state.validatedBody = body

  await next()
}

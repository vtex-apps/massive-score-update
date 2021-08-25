import { json } from 'co-body'
import { UserInputError } from '@vtex/api'

export async function validateMiddleware(
  ctx: Context,
  next: () => Promise<any>
) {
  const requestList = await json(ctx.req)
  const errorList: any[] = []

  function requestValidator(request: UpdateRequest): void {
    const requestErrorList: UpdateResponse[] = []

    const { id, score } = request

    if (!id) {
      requestErrorList.push(errorResponseGenerator('id'))
    }

    if (!score) {
      requestErrorList.push(errorResponseGenerator('score'))
    }

    if (requestErrorList.length >= 1) {
      errorList.push(requestErrorList)
    }

    function errorResponseGenerator(field: string): UpdateResponse {
      return {
        success: 'false',
        error: 'Request failed with status code 400',
        errorMessage: `The request is invalid:  The '${field}' field is required.`,
      }
    }
  }

  try {
    for (const request of requestList) {
      requestValidator(request)
    }
  } catch (error) {
    throw new UserInputError(error)
  }

  if (errorList.length >= 1) {
    ctx.status = 400
    ctx.response.body = {
      errorList,
    }

    return
  }

  ctx.state.validatedBody = requestList

  await next()
}

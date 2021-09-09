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
      requestErrorList.push(errorResponseGenerator('id', 1))
    } else {
      if (!(typeof id === 'number')) {
        requestErrorList.push(errorResponseGenerator('id', 2))

      }
    }

    if (!score) {
      requestErrorList.push(errorResponseGenerator('score', 1))
    } else {
      if (!(typeof score === 'number')) {
        requestErrorList.push(errorResponseGenerator('score', 2))

      }
    }

    if (requestErrorList.length >= 1) {
      errorList.push(requestErrorList)
    }

    function errorResponseGenerator(field: string, option: number): UpdateResponse {
      const response: UpdateResponse = {
        id,
        score,
        success: 'false',
        error: 400,

      }
      if (option === 1) {
        response.errorMessage = `The request is invalid: The '${field}' field is required.`
        return response
      } else {
        response.errorMessage = `The request is invalid: field ${field}' must be a number.`
        return response
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
    ctx.body = {
      failedResponses: {
        elements: errorList,
        quantity: errorList.length,
      },
    }

    return
  }

  ctx.state.validatedBody = requestList

  await next()
}

import { json } from 'co-body'
import { UserInputError } from '@vtex/api'

import type { BodyRequest, BodyResponse } from '../interfaces'
import { ResponseManager } from "../interfaces";

export async function validateMiddleware(
  ctx: Context,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  next: () => Promise<any>
) {
  console.log("-------------------------------------------------------------")

  const responseManager: ResponseManager = {
    updateResponse: [],
    responseProduct: [],
    responseCategory: [],
    errors429: []
  }

  console.log('asdasdasd')

  console.log("responseManager", responseManager)

  const requestList = await json(ctx.req)
  const errorList: BodyResponse[][] = []

  function requestValidator(request: BodyRequest): void {
    const requestErrorList: BodyResponse[] = []

    const { id, score } = request

    if (!id) {
      requestErrorList.push(errorResponseGenerator('id', 1))
    } else if (!(typeof id === 'number')) {
      requestErrorList.push(errorResponseGenerator('id', 2))
    }

    if (!score) {
      requestErrorList.push(errorResponseGenerator('score', 1))
    } else if (!(typeof score === 'number')) {
      requestErrorList.push(errorResponseGenerator('score', 2))
    }

    if (requestErrorList.length >= 1) {
      errorList.push(requestErrorList)
    }

    function errorResponseGenerator(
      field: string,
      option: number
    ): BodyResponse {
      const response: BodyResponse = {
        id,
        score,
        success: 'false',
        error: 400,
      }

      if (option === 1) {
        response.errorMessage = `The request is invalid: The '${field}' field is required.`

        return response
      }

      response.errorMessage = `The request is invalid: field '${field}' must be a number.`

      return response
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
  ctx.state.responseManager = responseManager

  await next()
}

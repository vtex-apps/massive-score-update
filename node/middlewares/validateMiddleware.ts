import { json } from 'co-body'
import { UserInputError } from '@vtex/api'

import type { BodyRequest, BodyResponse, ResponseManager } from '../interfaces'
import { buildBadRequest } from './utils'

export async function validateMiddleware(
  ctx: Context,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  next: () => Promise<any>
) {
  const vtexIdToken = ctx.get('VtexIdclientAutCookie')

  if (!vtexIdToken) {
    ctx.status = 401

    return
  }

  const responseManager: ResponseManager = {
    updateResponse: [],
    responseProduct: [],
    responseCategory: [],
    errors429: [],
  }

  const requestList = await json(ctx.req)
  const errorList: BodyResponse[][] = []

  function requestValidator(request: BodyRequest): void {
    const requestErrorList: BodyResponse[] = []

    const { id, score } = request

    if (!id) {
      requestErrorList.push(buildBadRequest(id, score, 'id', 1))
    } else if (!(typeof id === 'number')) {
      requestErrorList.push(buildBadRequest(id, score, 'id', 2))
    }

    if (!score) {
      requestErrorList.push(buildBadRequest(id, score, 'score', 1))
    } else if (!(typeof score === 'number')) {
      requestErrorList.push(buildBadRequest(id, score, 'score', 2))
    }

    if (requestErrorList.length >= 1) {
      errorList.push(requestErrorList)
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

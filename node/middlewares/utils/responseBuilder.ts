import type { ResponseManager } from '../../interfaces'

export const buildResponse = (
  responseManager: ResponseManager,
  ctx: Context
): void => {
  const { updateResponse } = responseManager

  const successfulResponses = updateResponse.filter((e) => {
    return e.success !== 'false'
  })

  const failedResponses = updateResponse.filter((e) => {
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
    total: updateResponse.length,
  }
}

export const buildErrorResponse = (
  responseManager: ResponseManager,
  ctx: Context
): void => {
  const { updateResponse } = responseManager

  ctx.status = 400
  ctx.body = {
    failedResponses: {
      elements: updateResponse,
      quantity: updateResponse.length,
    },
  }
}

export const buildServiceErrorResponse = (
  error: string,
  ctx: Context
): void => {
  ctx.status = 500
  ctx.body = error
}

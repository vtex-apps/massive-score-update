import type { ResponseManager } from '../../interfaces'

export function buildResponse(
  responseManager: ResponseManager,
  ctx: Context
): void {
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
}

export function buildErrorResponse(
  responseManager: ResponseManager,
  ctx: Context
): void {
  ctx.status = 400
  ctx.body = {
    failedResponses: {
      elements: responseManager.updateResponse,
      quantity: responseManager.updateResponse.length,
    },
  }
}

export function buildErrorServiceResponse(error: string, ctx: Context): void {
  ctx.status = 500
  ctx.body = error
}

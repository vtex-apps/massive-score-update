import type { BodyResponse, ResponseManager } from '../../interfaces'

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

export const buildBadRequest = (
  id: number,
  score: number,
  field: string,
  option: number
  // eslint-disable-next-line max-params
): BodyResponse => {
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

import {
  buildErrorResponse,
  buildServiceErrorResponse, operation,
  retryCall
} from "./utils";

export async function getProductMiddleware(
  ctx: Context,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  next: () => Promise<any>
) {
  const {
    state: { responseManager : manager, validatedBody },
  } = ctx

  const responseManager = manager

  async function myOperations(): Promise<void> {
    await retryCall(ctx, responseManager, operation, myOperations,'getProduct')
  }

  try {
    await Promise.all(
      validatedBody.map(async (request) => {
        const { id, score } = request
        return operation(ctx, responseManager, id, score, 'getProduct')
      })
    )

    if (responseManager.updateResponse.length >= 1) {
      buildErrorResponse(responseManager, ctx)
      return
    }

    await myOperations()

    ctx.state.responseManager = responseManager
    await next()
  } catch (error) {
    console.log('errorrr', error)
    buildServiceErrorResponse(error, ctx)
  }
}

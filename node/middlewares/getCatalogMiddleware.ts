
import {
  buildErrorResponse,
  buildServiceErrorResponse, operation, retryCall
} from "./utils";

export async function getCatalogMiddleware(
  ctx: Context,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  next: () => Promise<any>
) {
  const {
    state: { responseManager : manager, validatedBody },
  } = ctx
  const responseManager = manager

  async function myOperations(): Promise<void> {
    await retryCall(ctx, responseManager, operation, myOperations,'getCategory')
  }

  try {
    await Promise.all(
      validatedBody.map(async (elem) => {
        const { id, score } = elem
        return operation(ctx, responseManager, id, score, 'getCategory')
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
    buildServiceErrorResponse(error, ctx)
  }
}

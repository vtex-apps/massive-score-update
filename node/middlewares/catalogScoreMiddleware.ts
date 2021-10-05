import {
  buildServiceErrorResponse,
  buildResponse,
  retryCall,
  operation,
} from './utils'

export async function catalogScoreMiddleware(
  ctx: Context,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  next: () => Promise<any>
) {
  const {
    state: { responseManager: manager, validatedBody },
  } = ctx

  const responseManager = manager

  async function myOperations(): Promise<void> {
    await retryCall(
      ctx,
      responseManager,
      operation,
      myOperations,
      'updateCategory'
    )
  }

  try {
    await Promise.all(
      validatedBody.map(async (elem) => {
        const { id, score } = elem

        return operation(ctx, responseManager, id, score, 'updateCategory')
      })
    )
    await myOperations()

    buildResponse(responseManager, ctx)
    ctx.state.responseManager = responseManager

    await next()
  } catch (error) {
    buildServiceErrorResponse(error, ctx)
    await next()
  }
}

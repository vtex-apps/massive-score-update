import {
  buildServiceErrorResponse,
  buildResponse,
  retryCall,
  operation,
} from './utils'

export async function productScoreMiddleware(
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
      'updateProduct'
    )
  }

  try {
    await Promise.all(
      validatedBody.map(async (elem) => {
        const { id, score } = elem

        return operation(ctx, responseManager, id, score, 'updateProduct')
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

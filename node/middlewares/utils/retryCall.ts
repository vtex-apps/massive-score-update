import { getTimeOutDefault } from "./getTimeOutDefault";
import { sleep } from "./sleep";

export const retryCall = async (
  ctx: Context,
  responseManager: any,
  productOperation: (
    ctx: Context,
    responseManager: any,
    id: number,
    score: number,
    operation: string
  )=>any,
  retry: ()=>any,
  operationType: string
): Promise<true | void> => {
  if (responseManager.errors429.length >= 1) {
    let value = '0'

    const retryList = responseManager.errors429

    for (const index in responseManager.errors429) {
      const errorResponse = responseManager.errors429[index]

      if (errorResponse.errorMessage && errorResponse.errorMessage > value) {
        value = errorResponse.errorMessage
      }
    }

    if (value === '0') {
      value = await getTimeOutDefault(ctx, value)
    }

    await sleep(value)

    responseManager.errors429 = []

    await Promise.all(
      retryList.map(async (item: { id: number, score: number }) => {
        const { id, score } = item

        return productOperation(ctx, responseManager, id, score, operationType)
      })
    )

    return retry()
  }

  return true
}

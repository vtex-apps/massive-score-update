export const getTimeOutDefault = async (
  ctx: Context,
  value: string
): Promise<string> => {
  const appId = process.env.VTEX_APP_ID ? process.env.VTEX_APP_ID : ''
  const { timeOutDefault } = await ctx.clients.apps.getAppSettings(appId)

  value =
    timeOutDefault !== undefined &&
    /^\d+$/.test(timeOutDefault) &&
    timeOutDefault > '20'
      ? timeOutDefault
      : '20'

  return value
}

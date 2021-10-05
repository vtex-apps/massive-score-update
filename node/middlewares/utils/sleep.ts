export const sleep = async (delay: string) =>
  new Promise((resolve) => setTimeout(resolve, parseFloat(delay) * 1000))

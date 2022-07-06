export async function errorHandler(ctx: any, next: () => Promise<void>) {
  const {
    vtex: { logger },
  } = ctx

  console.log('running error handler')
  try {
    await next()
  } catch (error) {
    logger.error({
      message: error.message,
      error,
    })
  }
}
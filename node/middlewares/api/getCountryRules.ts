export async function getCountryRules(ctx: any, next: () => Promise<any>) {

  const { countryCode } = ctx.vtex.route.params
  if (!countryCode) {
    throw new Error(`Error getting request`)
  }
  const parsedCountryCode = countryCode.toUpperCase()
  

  let output = {
    success: false,
    errorMessage: 'Not Found',
    data: {},
  }
  
  console.log('countryCode::', parsedCountryCode)
  import(`../../../react/country/${countryCode}.js`).then(rules => {
    console.log('countryCode::', rules)
    if (rules) {
      output = {
        ...output,
        success: true,
        errorMessage: '',
        data: rules,
      }
    }
  })
  .catch (error => {
    console.log(`Error getting request: ${error}`)
  })

  
  
  ctx.status = 200
  ctx.set('Cache-Control', 'no-cache')
  ctx.body = output

  await next()
}
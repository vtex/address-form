import { method, Service } from '@vtex/api'
import { errorHandler } from './middlewares/errorHandler'
import { getCountryRules } from './middlewares/api/getCountryRules'

export default new Service({
  routes: {
    apiGetCountryRules: method({
      GET: [errorHandler, getCountryRules],
    }),
  },
})
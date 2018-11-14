import axios from 'axios'

export function getAddress({ cors = false, accountName, country, postalCode }) {
  let endpoint

  const cleanPostalCode = postalCode.replace(/ /g, '')

  /* istanbul ignore if */
  if (cors) {
    endpoint = `https://${accountName}.vtexcommercestable.com.br/api/checkout/pub/postal-code/${country}/${cleanPostalCode}`
  } else {
    endpoint = `/api/checkout/pub/postal-code/${country}/${cleanPostalCode}`
  }

  return axios.get(endpoint).then(response => response.data)
}

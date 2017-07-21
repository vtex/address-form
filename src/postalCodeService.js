import axios from 'axios'

export function getAddress({ accountName, country, postalCode }) {
  let endpoint

  const cleanPostalCode = postalCode.replace(/ /g, '')

  /* istanbul ignore if */
  if (process.env.NODE_ENV === 'development') {
    endpoint = `/api/checkout/pub/postal-code/${country}/${cleanPostalCode}`
  } else {
    endpoint = `https://${accountName}.vtexcommercestable.com.br/api/checkout/pub/postal-code/${country}/${cleanPostalCode}`
  }

  return axios.get(endpoint).then(response => response.data)
}

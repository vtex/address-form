import axios from 'axios'

export function getAddress({ cors = false, accountName, country, postalCode }) {
  let endpoint

  const cleanPostalCode = postalCode.replace(/ /g, '')

  const HOST_URL = document.querySelector('base') ? document.baseURI : ''

  /* istanbul ignore if */
  if (cors) {
    endpoint = `https://${accountName}.vtexcommercestable.com.br/api/checkout/pub/postal-code/${country}/${cleanPostalCode}`
  } else {
    endpoint = `${HOST_URL}/api/checkout/pub/postal-code/${country}/${cleanPostalCode}`
  }

  return axios.get(endpoint).then((response) => response.data)
}

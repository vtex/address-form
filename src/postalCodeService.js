import axios from 'axios'

export function getAddress({ accountName, country, postalCode }) {
  return axios
    .get(
      `https://${accountName}.vtexcommercestable.com.br/api/checkout/pub/postal-code/${country}/${postalCode}`
    )
    .then(response => response.data)
}

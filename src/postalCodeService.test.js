import { getAddress } from './postalCodeService'

jest.mock('axios', () => {
  return {
    get: endpoint => Promise.resolve({ data: { foo: 'bar', endpoint } }),
  }
})

const accountName = 'qamarketplace'
const country = 'BRA'

test('should response with data', () => {
  expect.assertions(1)

  return getAddress({
    accountName,
    country,
    postalCode: '22231-000',
  }).then(data => {
    expect(data.foo).toBe('bar')
  })
})

test('should compose the endpoint right', () => {
  expect.assertions(1)

  return getAddress({
    cors: true,
    accountName,
    country,
    postalCode: '22231 000',
  }).then(data => {
    const endpoint = `https://${accountName}.vtexcommercestable.com.br/api/checkout/pub/postal-code/${country}/22231000`
    expect(data.endpoint).toBe(endpoint)
  })
})

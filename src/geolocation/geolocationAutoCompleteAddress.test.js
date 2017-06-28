import geolocationAutoCompleteAddress from './geolocationAutoCompleteAddress'
import googleAddress from './__mocks__/googleAddress'
import usePostalCode from '../country/__mocks__/usePostalCode'

describe('Geolocation Auto Complete Address', () => {
  it('should transform a Google address to a Checkout address', () => {
    const address = geolocationAutoCompleteAddress(
      googleAddress,
      usePostalCode.geolocation,
      usePostalCode.country
    )

    expect(address).toMatchSnapshot()
  })
})

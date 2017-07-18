import geolocationAutoCompleteAddress from './geolocationAutoCompleteAddress'
import postalCodeGoogleAddress from './__mocks__/postalCodeGoogleAddress'
import oneLevelGoogleAddress from './__mocks__/oneLevelGoogleAddress'
import invalidFieldGoogleAddress from './__mocks__/invalidFieldGoogleAddress'
import usePostalCode from '../country/__mocks__/usePostalCode'
import useOneLevel from '../country/__mocks__/useOneLevel'

describe('Geolocation Auto Complete Address', () => {
  it('should transform a Google address to a Checkout address', () => {
    const address = geolocationAutoCompleteAddress(
      postalCodeGoogleAddress,
      usePostalCode,
      usePostalCode.country
    )

    expect(address).toMatchSnapshot()
  })

  it('should call handlers to fill postalCode', () => {
    const address = geolocationAutoCompleteAddress(
      oneLevelGoogleAddress,
      useOneLevel,
      useOneLevel.country
    )

    expect(address.postalCode.value).toBe('0000')
  })

  it('should get an address with a focus on the first invalid field', () => {
    const address = geolocationAutoCompleteAddress(
      invalidFieldGoogleAddress,
      usePostalCode,
      usePostalCode.country
    )

    expect(address.postalCode.valid).toBe(false)
    expect(address.postalCode.focus).toBe(true)
  })
})

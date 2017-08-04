import geolocationAutoCompleteAddress from './geolocationAutoCompleteAddress'
import postalCodeGoogleAddress from './__mocks__/postalCodeGoogleAddress'
import oneLevelGoogleAddress from './__mocks__/oneLevelGoogleAddress'
import invalidFieldGoogleAddress from './__mocks__/invalidFieldGoogleAddress'
import usePostalCode from '../country/__mocks__/usePostalCode'
import useOneLevel from '../country/__mocks__/useOneLevel'
import newAddress from '../__mocks__/newAddress'

describe('Geolocation Auto Complete Address', () => {
  it('should transform a Google address to a Checkout address', () => {
    const address = geolocationAutoCompleteAddress(
      newAddress,
      postalCodeGoogleAddress,
      usePostalCode
    )

    expect(address).toMatchSnapshot()
  })

  it('should call handlers to fill postalCode', () => {
    const address = geolocationAutoCompleteAddress(
      newAddress,
      oneLevelGoogleAddress,
      useOneLevel
    )

    expect(address.postalCode.value).toBe('0000')
  })

  it('should get an address with a focus on the first invalid field', () => {
    const address = geolocationAutoCompleteAddress(
      newAddress,
      invalidFieldGoogleAddress,
      usePostalCode
    )

    expect(address.postalCode.valid).toBe(false)
    expect(address.postalCode.focus).toBe(true)
  })

  it('should not override receiverName', () => {
    const receiverName = 'Linus'

    const address = geolocationAutoCompleteAddress(
      { ...newAddress, receiverName: { value: receiverName } },
      postalCodeGoogleAddress,
      usePostalCode
    )

    expect(address.receiverName.value).toBe(receiverName)
  })
})

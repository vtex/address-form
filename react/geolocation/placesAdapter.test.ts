import { toLegacyPlaceResult } from './placesAdapter'
import { toNewPlace, withLatLng } from './__mocks__/placesApiNew'
import geolocationAutoCompleteAddress from './geolocationAutoCompleteAddress'
import postalCodeGoogleAddress from './__mocks__/postalCodeGoogleAddress'
import usePostalCode from '../country/__mocks__/usePostalCode'
import newAddress from '../__mocks__/newAddress'
import ARG from '../country/ARG'

const cabaGoogleAddress = {
  address_components: [
    { long_name: '1234', short_name: '1234', types: ['street_number'] },
    {
      long_name: 'Avenida Corrientes',
      short_name: 'Av. Corrientes',
      types: ['route'],
    },
    {
      long_name: 'San Nicolás',
      short_name: 'San Nicolás',
      types: ['sublocality_level_1', 'sublocality', 'political'],
    },
    {
      long_name: 'Buenos Aires',
      short_name: 'CABA',
      types: ['administrative_area_level_1', 'political'],
    },
    {
      long_name: 'Argentina',
      short_name: 'AR',
      types: ['country', 'political'],
    },
  ],
  formatted_address: 'Av. Corrientes 1234, C1043 CABA, Argentina',
}

describe('toLegacyPlaceResult', () => {
  it('maps address components, formatted address and location', () => {
    const location = { lat: () => -22.94, lng: () => -43.18 }

    const result = toLegacyPlaceResult({
      addressComponents: [
        { longText: 'Rio de Janeiro', shortText: 'RJ', types: ['state'] },
      ],
      formattedAddress: 'Rio de Janeiro - RJ, Brasil',
      location: location as google.maps.LatLng,
      fetchFields: jest.fn(),
    })

    expect(result).toEqual({
      address_components: [
        { long_name: 'Rio de Janeiro', short_name: 'RJ', types: ['state'] },
      ],
      formatted_address: 'Rio de Janeiro - RJ, Brasil',
      geometry: { location },
    })
    expect(result.geometry?.location).toBe(location)
  })

  it('omits geometry when the place has no location', () => {
    const result = toLegacyPlaceResult({
      addressComponents: [],
      formattedAddress: 'Somewhere',
      location: null,
      fetchFields: jest.fn(),
    })

    expect(result.geometry).toBeUndefined()
  })

  it('defaults missing address components and texts', () => {
    const result = toLegacyPlaceResult({
      addressComponents: [{ longText: null, shortText: null, types: ['x'] }],
      fetchFields: jest.fn(),
    })

    expect(result).toEqual({
      address_components: [{ long_name: '', short_name: '', types: ['x'] }],
      formatted_address: '',
    })

    expect(
      toLegacyPlaceResult({ fetchFields: jest.fn() }).address_components
    ).toEqual([])
  })

  it('produces the same address as the legacy flow for the same place', () => {
    const legacy = withLatLng(postalCodeGoogleAddress, -22.941129, -43.180751)

    expect(
      geolocationAutoCompleteAddress(
        newAddress,
        toLegacyPlaceResult(toNewPlace(legacy)),
        usePostalCode
      )
    ).toEqual(geolocationAutoCompleteAddress(newAddress, legacy, usePostalCode))
  })

  it('keeps country handlers working (ARG CABA)', () => {
    const legacy = withLatLng(cabaGoogleAddress, -34.6037, -58.3816)

    const fromNew = geolocationAutoCompleteAddress(
      newAddress,
      toLegacyPlaceResult(toNewPlace(legacy)),
      ARG
    )

    expect(fromNew).toEqual(
      geolocationAutoCompleteAddress(newAddress, legacy, ARG)
    )
    expect(fromNew.state.value).toBe('Ciudad Autónoma de Buenos Aires')
    expect(fromNew.city.value).toBe('Ciudad Autónoma de Buenos Aires')
    expect(fromNew.geoCoordinates.value).toEqual([-58.3816, -34.6037])
  })
})

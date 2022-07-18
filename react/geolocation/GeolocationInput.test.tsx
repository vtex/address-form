import React from 'react'
import { render, screen, userEvent } from 'test-utils'
import { initialize, event, mockInstances } from '@googlemaps/jest-mocks'

import { EEMPTY } from '../constants'
import type { AddressWithValidation } from '../types/address'
import GeolocationInput from './GeolocationInput'
import AddressContainer from '../AddressContainer'
import AddressRules from '../AddressRules'

const address: AddressWithValidation = {
  addressId: { value: 'id' },
  addressQuery: { value: '' },
  addressType: { value: 'residential' },
  city: { value: null },
  complement: { value: null },
  country: { value: 'BRA' },
  geoCoordinates: { value: null },
  isDisposable: { value: null },
  neighborhood: { value: null },
  number: { value: null },
  postalCode: { value: null },
  receiverName: { value: null },
  reference: { value: null },
  state: { value: null },
  street: { value: null },
}

describe('GeolocationInput', () => {
  let placeWithoutPostalCode

  beforeEach(() => {
    jest.resetAllMocks()

    initialize()

    placeWithoutPostalCode = {
      address_components: [
        { long_name: '240', short_name: '240', types: ['street_number'] },
        { long_name: 'Corrientes', short_name: 'Corrientes', types: ['route'] },
        {
          long_name: 'Las Varillas',
          short_name: 'Las Varillas',
          types: ['locality', 'political'],
        },
        {
          long_name: 'San Justo',
          short_name: 'San Justo',
          types: ['administrative_area_level_2', 'political'],
        },
        {
          long_name: 'Córdoba',
          short_name: 'Córdoba',
          types: ['administrative_area_level_1', 'political'],
        },
        {
          long_name: 'Argentina',
          short_name: 'AR',
          types: ['country', 'political'],
        },
      ],
      formatted_address: 'Corrientes 240, Las Varillas, Córdoba, Argentina',
      geometry: {
        location: new google.maps.LatLng({
          lat: -31.8661596,
          lng: -62.7156028,
        }),
        viewport: new google.maps.LatLngBounds(
          new google.maps.LatLng({
            lat: -31.86746208029151,
            lng: -62.71688778029151,
          }),
          new google.maps.LatLng({
            lat: -31.86476411970851,
            lng: -62.71418981970849,
          })
        ),
      },
    }
  })

  it('should render input for address', async () => {
    render(
      <AddressRules country="BRA" shouldUseIOFetching>
        <AddressContainer address={address} onChangeAddress={jest.fn()}>
          <GeolocationInput googleMaps={google.maps} />
        </AddressContainer>
      </AddressRules>
    )

    const input = await screen.findByLabelText(/address/i)

    expect(input).toHaveValue('')
  })

  it('should update input value with user input', async () => {
    const onAddressChange = jest.fn()

    render(
      <AddressRules country="BRA" shouldUseIOFetching>
        <AddressContainer address={address} onChangeAddress={onAddressChange}>
          <GeolocationInput googleMaps={google.maps} />
        </AddressContainer>
      </AddressRules>
    )

    const input = await screen.findByLabelText(/address/i)

    await userEvent.type(input, 'praia de botafogo 300')

    expect(input).toHaveValue('praia de botafogo 300')
  })

  it('should call address change when autocompleting address', async () => {
    const onAddressChange = jest.fn()

    render(
      <AddressRules country="ARG" shouldUseIOFetching>
        <AddressContainer address={address} onChangeAddress={onAddressChange}>
          <GeolocationInput googleMaps={google.maps} />
        </AddressContainer>
      </AddressRules>
    )

    await screen.findByLabelText(/address/i)

    const [autocompleteInstance] = mockInstances.get(
      google.maps.places.Autocomplete
    )

    ;(autocompleteInstance.getPlace as jest.MockedFunction<
      typeof autocompleteInstance.getPlace
    >).mockImplementation(() => placeWithoutPostalCode)

    const [
      [, , autoCompleteListener],
    ] = (event.addListener as jest.MockedFunction<
      typeof event.addListener
    >).mock.calls

    autoCompleteListener()

    expect(onAddressChange).toHaveBeenCalledWith(
      expect.objectContaining({
        postalCode: expect.objectContaining({
          valid: false,
          reason: EEMPTY,
        }),
        street: {
          value: 'Corrientes',
          geolocationAutoCompleted: true,
        },
        number: {
          value: '240',
          geolocationAutoCompleted: true,
          notApplicable: true,
        },
        city: {
          value: 'San Justo',
          geolocationAutoCompleted: true,
        },
        state: {
          value: 'Córdoba',
          geolocationAutoCompleted: true,
        },
        neighborhood: {
          value: 'Las Varillas',
          geolocationAutoCompleted: true,
        },
      })
    )
  })
})

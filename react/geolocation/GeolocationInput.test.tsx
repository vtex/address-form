/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { render, screen, userEvent, waitFor, fireEvent, act } from 'test-utils'
import { initialize, event, mockInstances } from '@googlemaps/jest-mocks'

import { EEMPTY } from '../constants'
import type { AddressWithValidation } from '../types/address'
import GeolocationInput, { SUGGESTIONS_DEBOUNCE_MS } from './GeolocationInput'
import AddressContainer from '../AddressContainer'
import AddressRules from '../AddressRules'
import { resetPlacesApiNewErrorReport } from './placesMode'
import {
  MockAutocompleteSessionToken,
  apiKeyServiceBlockedError,
  createPrediction,
  installPlacesApiNew,
  toNewPlace,
  withLatLng,
} from './__mocks__/placesApiNew'

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
    resetPlacesApiNewErrorReport()

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

  describe('without the store opt-in (default)', () => {
    let fetchAutocompleteSuggestions: jest.Mock

    beforeEach(() => {
      ;({ fetchAutocompleteSuggestions } = installPlacesApiNew())
      window.logSplunk = () => {}
      jest.spyOn(window, 'logSplunk')
    })

    afterEach(() => {
      delete window.logSplunk
      delete window.vtex
    })

    it.each([
      ['window.vtex is missing', undefined],
      ['the preference is legacy', { googlePlacesApi: 'legacy' }],
      [
        'the template placeholder was not rendered',
        { googlePlacesApi: '{{ config.googlePlacesApi }}' },
      ],
    ])('keeps the legacy Autocomplete when %s', async (_description, vtex) => {
      if (vtex) {
        window.vtex = vtex
      }

      render(
        <AddressRules country="BRA" shouldUseIOFetching>
          <AddressContainer address={address} onChangeAddress={jest.fn()}>
            <GeolocationInput googleMaps={google.maps} />
          </AddressContainer>
        </AddressRules>
      )

      const input = await screen.findByLabelText(/address/i)

      expect(mockInstances.get(google.maps.places.Autocomplete)).toHaveLength(1)
      expect(input).not.toHaveAttribute('role')

      await userEvent.type(input, 'praia')
      await new Promise((resolve) =>
        setTimeout(resolve, SUGGESTIONS_DEBOUNCE_MS + 50)
      )

      expect(fetchAutocompleteSuggestions).not.toHaveBeenCalled()
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
      expect(window.logSplunk).not.toHaveBeenCalled()
    })
  })

  describe('with Places API (New)', () => {
    let fetchAutocompleteSuggestions: jest.Mock
    let searchByText: jest.Mock

    const expectedArgentinaAddress = expect.objectContaining({
      street: { value: 'Corrientes', geolocationAutoCompleted: true },
      number: {
        value: '240',
        geolocationAutoCompleted: true,
        notApplicable: true,
      },
      city: { value: 'San Justo', geolocationAutoCompleted: true },
      state: { value: 'Córdoba', geolocationAutoCompleted: true },
      geoCoordinates: expect.objectContaining({
        value: [-62.7156028, -31.8661596],
      }),
    })

    function createArgentinaPrediction(placeId = 'arg-1') {
      const place = toNewPlace(
        withLatLng(placeWithoutPostalCode, -31.8661596, -62.7156028)
      )

      return createPrediction(
        placeId,
        'Corrientes 240',
        'Las Varillas, Córdoba, Argentina',
        place
      )
    }

    function mockSuggestions(predictions: any[]) {
      fetchAutocompleteSuggestions.mockImplementation(() =>
        Promise.resolve({
          suggestions: predictions.map((placePrediction) => ({
            placePrediction,
          })),
        })
      )
    }

    function GeolocationTree({
      country = 'BRA',
      onChangeAddress,
      useSearchBox = false,
    }: {
      country?: string
      onChangeAddress: jest.Mock
      useSearchBox?: boolean
    }) {
      return (
        <AddressRules country={country} shouldUseIOFetching>
          <AddressContainer address={address} onChangeAddress={onChangeAddress}>
            <GeolocationInput
              googleMaps={google.maps}
              useSearchBox={useSearchBox}
            />
          </AddressContainer>
        </AddressRules>
      )
    }

    async function renderInput(
      props: { country?: string; useSearchBox?: boolean } = {}
    ) {
      const onChangeAddress = jest.fn()
      const utils = render(
        <GeolocationTree onChangeAddress={onChangeAddress} {...props} />
      )

      const input = (await screen.findByLabelText(
        /address/i
      )) as HTMLInputElement

      return { ...utils, input, onChangeAddress }
    }

    beforeEach(() => {
      ;({ fetchAutocompleteSuggestions, searchByText } = installPlacesApiNew())
      window.vtex = { googlePlacesApi: 'new' }
      window.logSplunk = () => {}
      jest.spyOn(window, 'logSplunk')
    })

    afterEach(() => {
      delete window.logSplunk
      delete window.vtex
    })

    it('shows suggestions restricted to the country region', async () => {
      mockSuggestions([createArgentinaPrediction()])

      const { input } = await renderInput({ country: 'BRA' })

      await userEvent.type(input, 'c')

      const options = await screen.findAllByRole('option')

      expect(options).toHaveLength(1)
      expect(options[0]).toHaveClass('pac-item')
      expect(screen.getByRole('listbox').parentElement).toHaveClass(
        'pac-container'
      )
      expect(screen.getByText('Google Maps')).toBeInTheDocument()
      expect(fetchAutocompleteSuggestions).toHaveBeenCalledWith({
        input: 'c',
        sessionToken: expect.any(MockAutocompleteSessionToken),
        includedRegionCodes: ['br'],
      })
      expect(input).toHaveAttribute('role', 'combobox')
      expect(input).toHaveAttribute('aria-expanded', 'true')
      expect(input).toHaveAttribute(
        'aria-controls',
        screen.getByRole('listbox').id
      )
      expect(mockInstances.get(google.maps.places.Autocomplete)).toHaveLength(0)
    })

    it('fills the address when a suggestion is clicked', async () => {
      const prediction = createArgentinaPrediction()

      mockSuggestions([prediction])

      const { input, onChangeAddress } = await renderInput({ country: 'ARG' })

      await userEvent.type(input, 'corrientes')
      const [option] = await screen.findAllByRole('option')

      onChangeAddress.mockClear()
      await userEvent.click(option)

      await waitFor(() => expect(onChangeAddress).toHaveBeenCalledTimes(1))
      expect(onChangeAddress).toHaveBeenCalledWith(expectedArgentinaAddress)
      expect(prediction.toPlace().fetchFields).toHaveBeenCalledWith({
        fields: ['addressComponents', 'formattedAddress', 'location'],
      })
      expect(input).toHaveValue(
        'Corrientes 240, Las Varillas, Córdoba, Argentina'
      )
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
      expect(input).toHaveAttribute('aria-expanded', 'false')
    })

    it('starts a new session after a selection', async () => {
      mockSuggestions([createArgentinaPrediction()])

      const { input, onChangeAddress } = await renderInput({ country: 'ARG' })

      await userEvent.type(input, 'co')
      await userEvent.click((await screen.findAllByRole('option'))[0])
      await waitFor(() => expect(onChangeAddress).toHaveBeenCalled())

      fetchAutocompleteSuggestions.mockClear()
      await userEvent.type(input, 'x')
      await screen.findAllByRole('option')

      const firstToken = (fetchAutocompleteSuggestions as any).mock.calls[0][0]
        .sessionToken

      await userEvent.type(input, 'y')
      await waitFor(() =>
        expect(fetchAutocompleteSuggestions).toHaveBeenCalledTimes(2)
      )

      const [
        ,
        [{ sessionToken: sameSessionToken }],
      ] = (fetchAutocompleteSuggestions as any).mock.calls

      expect(sameSessionToken).toBe(firstToken)

      fetchAutocompleteSuggestions.mockClear()
      await userEvent.click((await screen.findAllByRole('option'))[0])
      await waitFor(() => expect(onChangeAddress).toHaveBeenCalledTimes(2))
      await userEvent.type(input, 'z')
      await waitFor(() =>
        expect(fetchAutocompleteSuggestions).toHaveBeenCalledTimes(1)
      )

      expect(
        (fetchAutocompleteSuggestions as any).mock.calls[0][0].sessionToken
      ).not.toBe(firstToken)
    })

    it('navigates and selects suggestions with the keyboard', async () => {
      mockSuggestions([
        createPrediction(
          'a',
          'Option A',
          'X',
          toNewPlace(placeWithoutPostalCode)
        ),
        createArgentinaPrediction('b'),
      ])

      const { input, onChangeAddress } = await renderInput({ country: 'ARG' })

      await userEvent.type(input, 'op')
      const options = await screen.findAllByRole('option')

      await userEvent.keyboard('{ArrowDown}')
      expect(input).toHaveAttribute('aria-activedescendant', options[0].id)
      expect(options[0]).toHaveAttribute('aria-selected', 'true')

      await userEvent.keyboard('{ArrowDown}')
      expect(input).toHaveAttribute('aria-activedescendant', options[1].id)

      await userEvent.keyboard('{ArrowDown}')
      expect(input).toHaveAttribute('aria-activedescendant', options[0].id)

      await userEvent.keyboard('{ArrowUp}')
      expect(input).toHaveAttribute('aria-activedescendant', options[1].id)

      onChangeAddress.mockClear()
      await userEvent.keyboard('{Enter}')

      await waitFor(() => expect(onChangeAddress).toHaveBeenCalledTimes(1))
      expect(onChangeAddress).toHaveBeenCalledWith(expectedArgentinaAddress)
    })

    it('closes the list on Escape and on blur without selecting', async () => {
      mockSuggestions([createArgentinaPrediction()])

      const { input, onChangeAddress } = await renderInput({ country: 'ARG' })

      await userEvent.type(input, 'co')
      await screen.findAllByRole('option')
      onChangeAddress.mockClear()

      await userEvent.keyboard('{Escape}')
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
      expect(input).toHaveAttribute('aria-expanded', 'false')

      await userEvent.type(input, 'r')
      await screen.findAllByRole('option')

      fireEvent.blur(input)
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
      expect(onChangeAddress).not.toHaveBeenCalled()
    })

    it('debounces fast typing into a single request', async () => {
      mockSuggestions([createArgentinaPrediction()])

      const { input } = await renderInput()

      await userEvent.type(input, 'praia de')
      await screen.findAllByRole('option')

      expect(fetchAutocompleteSuggestions).toHaveBeenCalledTimes(1)
      expect(fetchAutocompleteSuggestions).toHaveBeenCalledWith(
        expect.objectContaining({ input: 'praia de' })
      )
    })

    it('discards responses for queries that are no longer current', async () => {
      let resolveFirst: (value: any) => void = () => {}

      fetchAutocompleteSuggestions
        .mockImplementationOnce(
          () =>
            new Promise((resolve) => {
              resolveFirst = resolve
            })
        )
        .mockImplementation(() =>
          Promise.resolve({
            suggestions: [
              { placePrediction: createArgentinaPrediction('new') },
            ],
          })
        )

      const { input } = await renderInput()

      await userEvent.type(input, 'a')
      await waitFor(() =>
        expect(fetchAutocompleteSuggestions).toHaveBeenCalledTimes(1)
      )

      await userEvent.type(input, 'b')
      await screen.findAllByRole('option')

      await act(async () => {
        resolveFirst({
          suggestions: [
            { placePrediction: createArgentinaPrediction('old') },
            { placePrediction: createArgentinaPrediction('old-2') },
          ],
        })
      })

      expect(screen.getAllByRole('option')).toHaveLength(1)
    })

    it('does not request suggestions while Google Maps is loading', async () => {
      mockSuggestions([createArgentinaPrediction()])

      render(
        <AddressRules country="BRA" shouldUseIOFetching>
          <AddressContainer address={address} onChangeAddress={jest.fn()}>
            <GeolocationInput googleMaps={google.maps} loadingGoogle />
          </AddressContainer>
        </AddressRules>
      )

      const input = await screen.findByLabelText(/address/i)

      await userEvent.type(input, 'praia')
      await new Promise((resolve) =>
        setTimeout(resolve, SUGGESTIONS_DEBOUNCE_MS + 50)
      )

      expect(fetchAutocompleteSuggestions).not.toHaveBeenCalled()
      expect(input).not.toHaveAttribute('role')
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    })

    it('keeps the list closed when there are no results', async () => {
      mockSuggestions([])

      const { input } = await renderInput()

      await userEvent.type(input, 'zzzz')
      await waitFor(() =>
        expect(fetchAutocompleteSuggestions).toHaveBeenCalled()
      )

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
      expect(input).toHaveAttribute('aria-expanded', 'false')
    })

    it('does not change the address when the place has no location', async () => {
      const place = toNewPlace({ ...placeWithoutPostalCode, geometry: null })

      mockSuggestions([createPrediction('p', 'Somewhere', '', place)])

      const { input, onChangeAddress } = await renderInput({ country: 'ARG' })

      await userEvent.type(input, 'so')
      onChangeAddress.mockClear()
      await userEvent.click((await screen.findAllByRole('option'))[0])

      await waitFor(() => expect(place.fetchFields).toHaveBeenCalled())
      await act(() => Promise.resolve())
      expect(onChangeAddress).not.toHaveBeenCalled()
    })

    it('does not update anything when unmounted during a request', async () => {
      let resolvePlace: () => void = () => {}
      const prediction = createArgentinaPrediction()
      const place = prediction.toPlace()

      ;(place.fetchFields as jest.Mock).mockImplementation(
        () =>
          new Promise((resolve) => {
            resolvePlace = () => resolve({ place })
          })
      )
      mockSuggestions([prediction])

      const consoleError = jest.spyOn(console, 'error')
      const { input, onChangeAddress, unmount } = await renderInput({
        country: 'ARG',
      })

      await userEvent.type(input, 'co')
      await userEvent.click((await screen.findAllByRole('option'))[0])
      onChangeAddress.mockClear()

      unmount()

      await act(async () => {
        resolvePlace()
      })

      expect(onChangeAddress).not.toHaveBeenCalled()
      expect(consoleError).not.toHaveBeenCalled()
      consoleError.mockRestore()
    })

    it('uses the new region and a new session after the country changes', async () => {
      mockSuggestions([createArgentinaPrediction()])

      const onChangeAddress = jest.fn()
      const { rerender } = render(
        <GeolocationTree country="BRA" onChangeAddress={onChangeAddress} />
      )

      const input = await screen.findByLabelText(/address/i)

      await userEvent.type(input, 'a')
      await screen.findAllByRole('option')

      const [
        [{ sessionToken: braToken }],
      ] = (fetchAutocompleteSuggestions as any).mock.calls

      rerender(
        <GeolocationTree country="USA" onChangeAddress={onChangeAddress} />
      )

      await waitFor(() =>
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
      )

      fetchAutocompleteSuggestions.mockClear()

      // Let AddressRules load the USA rules before typing again.
      await act(() => new Promise((resolve) => setTimeout(resolve, 50)))
      await userEvent.type(screen.getByLabelText(/address/i), 'b')

      await waitFor(() =>
        expect(fetchAutocompleteSuggestions).toHaveBeenCalledWith(
          expect.objectContaining({ includedRegionCodes: ['us'] })
        )
      )

      const lastCall = (fetchAutocompleteSuggestions as any).mock.calls.slice(
        -1
      )[0][0]

      expect(lastCall.sessionToken).not.toBe(braToken)
    })

    describe('when Places API (New) cannot serve the opted-in store', () => {
      it('keeps the new API and reports a key that blocks it, without attaching legacy widgets', async () => {
        fetchAutocompleteSuggestions.mockRejectedValue(
          apiKeyServiceBlockedError()
        )

        const { input } = await renderInput({ country: 'BRA' })

        await userEvent.type(input, 'a')
        await waitFor(() => expect(window.logSplunk).toHaveBeenCalledTimes(1))

        expect(window.logSplunk).toHaveBeenCalledWith(
          expect.objectContaining({
            workflowInstance: 'places-api-new-error',
            event: expect.objectContaining({
              reason: 'API_KEY_SERVICE_BLOCKED',
              country: 'BRA',
            }),
          })
        )
        expect(mockInstances.get(google.maps.places.Autocomplete)).toHaveLength(
          0
        )
        expect(input).toHaveAttribute('role', 'combobox')
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument()

        fetchAutocompleteSuggestions.mockClear()
        await userEvent.type(input, 'b')
        await waitFor(() =>
          expect(fetchAutocompleteSuggestions).toHaveBeenCalledTimes(1)
        )
        expect(window.logSplunk).toHaveBeenCalledTimes(1)
      })

      it('does not attach the legacy SearchBox when useSearchBox is set', async () => {
        fetchAutocompleteSuggestions.mockRejectedValue({
          code: 'REQUEST_DENIED',
        })

        const { input } = await renderInput({ useSearchBox: true })

        await userEvent.type(input, 'a')
        await waitFor(() => expect(window.logSplunk).toHaveBeenCalledTimes(1))

        expect(mockInstances.get(google.maps.places.SearchBox)).toHaveLength(0)
      })

      it('reports a Maps version without the new API classes and makes no request', async () => {
        delete (google.maps.places as any).AutocompleteSuggestion

        const { input } = await renderInput()

        await userEvent.type(input, 'praia')
        await new Promise((resolve) =>
          setTimeout(resolve, SUGGESTIONS_DEBOUNCE_MS + 50)
        )

        expect(mockInstances.get(google.maps.places.Autocomplete)).toHaveLength(
          0
        )
        expect(input).toHaveAttribute('role', 'combobox')
        expect(fetchAutocompleteSuggestions).not.toHaveBeenCalled()
        expect(window.logSplunk).toHaveBeenCalledTimes(1)
        expect(window.logSplunk).toHaveBeenCalledWith(
          expect.objectContaining({
            event: expect.objectContaining({
              reason: 'unsupported-maps-version',
            }),
          })
        )
      })

      it('does not report transient errors and keeps requesting', async () => {
        fetchAutocompleteSuggestions
          .mockRejectedValueOnce(new Error('Failed to fetch'))
          .mockImplementation(() =>
            Promise.resolve({
              suggestions: [{ placePrediction: createArgentinaPrediction() }],
            })
          )

        const { input } = await renderInput()

        await userEvent.type(input, 'a')
        await waitFor(() =>
          expect(fetchAutocompleteSuggestions).toHaveBeenCalledTimes(1)
        )
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument()

        await userEvent.type(input, 'b')
        await screen.findAllByRole('option')

        expect(fetchAutocompleteSuggestions).toHaveBeenCalledTimes(2)
        expect(window.logSplunk).not.toHaveBeenCalled()
      })
    })

    describe('Enter without an active suggestion', () => {
      it('selects the first suggestion when useSearchBox is set', async () => {
        mockSuggestions([
          createArgentinaPrediction('first'),
          createPrediction(
            'second',
            'Other',
            '',
            toNewPlace(placeWithoutPostalCode)
          ),
        ])

        const { input, onChangeAddress } = await renderInput({
          country: 'ARG',
          useSearchBox: true,
        })

        await userEvent.type(input, 'co')
        await screen.findAllByRole('option')
        onChangeAddress.mockClear()

        await userEvent.keyboard('{Enter}')

        await waitFor(() => expect(onChangeAddress).toHaveBeenCalledTimes(1))
        expect(onChangeAddress).toHaveBeenCalledWith(expectedArgentinaAddress)
      })

      it('searches by text when useSearchBox is set and there are no suggestions', async () => {
        mockSuggestions([])
        searchByText.mockResolvedValue({
          places: [
            toNewPlace(
              withLatLng(placeWithoutPostalCode, -31.8661596, -62.7156028)
            ),
          ],
        })

        const { input, onChangeAddress } = await renderInput({
          country: 'ARG',
          useSearchBox: true,
        })

        await userEvent.type(input, 'corrientes 240')
        await waitFor(() =>
          expect(fetchAutocompleteSuggestions).toHaveBeenCalled()
        )
        onChangeAddress.mockClear()

        await userEvent.keyboard('{Enter}')

        await waitFor(() => expect(onChangeAddress).toHaveBeenCalledTimes(1))
        expect(searchByText).toHaveBeenCalledWith({
          textQuery: 'corrientes 240',
          fields: ['addressComponents', 'formattedAddress', 'location'],
          maxResultCount: 1,
          region: 'ar',
        })
        expect(onChangeAddress).toHaveBeenCalledWith(expectedArgentinaAddress)
      })

      it('does nothing when useSearchBox is not set', async () => {
        mockSuggestions([createArgentinaPrediction()])

        const { input, onChangeAddress } = await renderInput({ country: 'ARG' })

        await userEvent.type(input, 'co')
        await screen.findAllByRole('option')
        onChangeAddress.mockClear()

        await userEvent.keyboard('{Enter}')
        await act(() => Promise.resolve())

        expect(onChangeAddress).not.toHaveBeenCalled()
        expect(searchByText).not.toHaveBeenCalled()
        expect(screen.getAllByRole('option')).toHaveLength(1)
      })
    })
  })
})

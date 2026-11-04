/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  PLACE_FIELDS,
  createSessionToken,
  fetchPlace,
  fetchSuggestions,
  searchByText,
} from './newPlacesSource'
import {
  MockAutocompleteSessionToken,
  createPrediction,
  installPlacesApiNew,
  toNewPlace,
} from './__mocks__/placesApiNew'
import postalCodeGoogleAddress from './__mocks__/postalCodeGoogleAddress'

function createGoogleMaps() {
  const googleMaps: any = { places: {} }
  const mocks = installPlacesApiNew(googleMaps)

  return { googleMaps, ...mocks }
}

describe('newPlacesSource', () => {
  it('creates a new session token instance each time', () => {
    const { googleMaps } = createGoogleMaps()

    const first = createSessionToken(googleMaps)
    const second = createSessionToken(googleMaps)

    expect(first).toBeInstanceOf(MockAutocompleteSessionToken)
    expect(first).not.toBe(second)
  })

  it('restricts suggestions to the lowercased region code', async () => {
    const { googleMaps, fetchAutocompleteSuggestions } = createGoogleMaps()
    const sessionToken = createSessionToken(googleMaps)

    await fetchSuggestions(googleMaps, {
      input: 'praia',
      sessionToken,
      regionCode: 'BR',
      language: 'pt-BR',
    })

    expect(fetchAutocompleteSuggestions).toHaveBeenCalledWith({
      input: 'praia',
      sessionToken,
      includedRegionCodes: ['br'],
      language: 'pt-BR',
    })
  })

  it('does not filter by region when there is no region code', async () => {
    const { googleMaps, fetchAutocompleteSuggestions } = createGoogleMaps()
    const sessionToken = createSessionToken(googleMaps)

    await fetchSuggestions(googleMaps, {
      input: 'praia',
      sessionToken,
      regionCode: null,
    })

    expect(fetchAutocompleteSuggestions).toHaveBeenCalledWith({
      input: 'praia',
      sessionToken,
    })
  })

  it('maps place predictions to suggestion items', async () => {
    const { googleMaps, fetchAutocompleteSuggestions } = createGoogleMaps()
    const place = toNewPlace(postalCodeGoogleAddress)
    const prediction = createPrediction('p1', 'Rua A', 'Rio de Janeiro', place)

    fetchAutocompleteSuggestions.mockResolvedValueOnce({
      suggestions: [
        { placePrediction: prediction },
        { placePrediction: null },
        {
          placePrediction: {
            placeId: 'p2',
            text: { text: 'Only full text' },
            toPlace: jest.fn(),
          },
        },
      ],
    })

    const items = await fetchSuggestions(googleMaps, {
      input: 'rua',
      sessionToken: createSessionToken(googleMaps),
    })

    expect(items).toEqual([
      {
        id: 'p1',
        mainText: 'Rua A',
        secondaryText: 'Rio de Janeiro',
        prediction,
      },
      {
        id: 'p2',
        mainText: 'Only full text',
        secondaryText: '',
        prediction: expect.objectContaining({ placeId: 'p2' }),
      },
    ])
  })

  it('fetches only Essentials fields for a prediction', async () => {
    const place = toNewPlace(postalCodeGoogleAddress)
    const prediction = createPrediction('p1', 'Rua A', 'Rio', place)

    expect(await fetchPlace(prediction)).toBe(place)
    expect(place.fetchFields).toHaveBeenCalledWith({
      fields: ['addressComponents', 'formattedAddress', 'location'],
    })
    expect(PLACE_FIELDS).toEqual([
      'addressComponents',
      'formattedAddress',
      'location',
    ])
  })

  it('searches by text and returns the first place', async () => {
    const { googleMaps, searchByText: searchMock } = createGoogleMaps()
    const place = toNewPlace(postalCodeGoogleAddress)

    searchMock.mockResolvedValueOnce({ places: [place] })

    expect(
      await searchByText(googleMaps, { textQuery: 'rua a', regionCode: 'BR' })
    ).toBe(place)

    expect(searchMock).toHaveBeenCalledWith({
      textQuery: 'rua a',
      fields: PLACE_FIELDS,
      maxResultCount: 1,
      region: 'br',
    })
  })

  it('returns null when text search finds nothing', async () => {
    const { googleMaps } = createGoogleMaps()

    expect(await searchByText(googleMaps, { textQuery: 'xyz' })).toBeNull()
  })
})

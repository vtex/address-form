import type {
  AutocompleteSessionToken,
  GoogleMapsWithPlacesApiNew,
  PlacePrediction,
  PlacesApiNewPlace,
  SuggestionItem,
} from './placesTypes'

// Only Place Details Essentials fields: never request Pro/Enterprise fields.
export const PLACE_FIELDS = [
  'addressComponents',
  'formattedAddress',
  'location',
]

interface FetchSuggestionsParams {
  input: string
  sessionToken: AutocompleteSessionToken
  regionCode?: string | null
  language?: string
}

interface SearchByTextParams {
  textQuery: string
  regionCode?: string | null
}

export function createSessionToken(
  googleMaps: GoogleMapsWithPlacesApiNew
): AutocompleteSessionToken {
  return new googleMaps.places.AutocompleteSessionToken()
}

export function fetchSuggestions(
  googleMaps: GoogleMapsWithPlacesApiNew,
  { input, sessionToken, regionCode, language }: FetchSuggestionsParams
): Promise<SuggestionItem[]> {
  const request: Record<string, unknown> = { input, sessionToken }

  if (regionCode) {
    request.includedRegionCodes = [regionCode.toLowerCase()]
  }

  if (language) {
    request.language = language
  }

  return googleMaps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(
    request
  ).then(({ suggestions }) =>
    (suggestions ?? []).reduce<SuggestionItem[]>((items, suggestion) => {
      const prediction = suggestion.placePrediction

      if (prediction) {
        items.push({
          id: prediction.placeId,
          mainText: prediction.mainText?.text ?? prediction.text?.text ?? '',
          secondaryText: prediction.secondaryText?.text ?? '',
          prediction,
        })
      }

      return items
    }, [])
  )
}

export function fetchPlace(
  prediction: PlacePrediction
): Promise<PlacesApiNewPlace> {
  const place = prediction.toPlace()

  return place.fetchFields({ fields: PLACE_FIELDS }).then(() => place)
}

export function searchByText(
  googleMaps: GoogleMapsWithPlacesApiNew,
  { textQuery, regionCode }: SearchByTextParams
): Promise<PlacesApiNewPlace | null> {
  const request: Record<string, unknown> = {
    textQuery,
    fields: PLACE_FIELDS,
    maxResultCount: 1,
  }

  if (regionCode) {
    request.region = regionCode.toLowerCase()
  }

  return googleMaps.places.Place.searchByText(request).then(
    ({ places }) => places?.[0] ?? null
  )
}

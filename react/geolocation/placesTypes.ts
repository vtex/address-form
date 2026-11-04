// Minimal typings for the subset of Places API (New) used by GeolocationInput.
// The installed @types/google.maps predates these classes.

export interface FormattableText {
  text: string
}

export interface PlaceAddressComponent {
  longText: string | null
  shortText: string | null
  types: string[]
}

export interface PlacesApiNewPlace {
  addressComponents?: PlaceAddressComponent[] | null
  formattedAddress?: string | null
  location?: google.maps.LatLng | null
  fetchFields(options: { fields: string[] }): Promise<{ place: PlacesApiNewPlace }>
}

export interface PlacePrediction {
  placeId: string
  text?: FormattableText | null
  mainText?: FormattableText | null
  secondaryText?: FormattableText | null
  toPlace(): PlacesApiNewPlace
}

export interface AutocompleteSuggestion {
  placePrediction: PlacePrediction | null
}

export type AutocompleteSessionToken = Record<string, unknown>

export interface GoogleMapsWithPlacesApiNew {
  places: {
    AutocompleteSuggestion: {
      fetchAutocompleteSuggestions(
        request: Record<string, unknown>
      ): Promise<{ suggestions: AutocompleteSuggestion[] }>
    }
    AutocompleteSessionToken: new () => AutocompleteSessionToken
    Place: {
      searchByText(
        request: Record<string, unknown>
      ): Promise<{ places: PlacesApiNewPlace[] }>
    }
  }
}

export interface SuggestionItem {
  id: string
  mainText: string
  secondaryText: string
  prediction: PlacePrediction
}

export interface LegacyAddressComponent {
  long_name: string
  short_name: string
  types: string[]
}

export interface LegacyPlaceResult {
  address_components: LegacyAddressComponent[]
  formatted_address: string
  geometry?: {
    location: google.maps.LatLng
  }
}

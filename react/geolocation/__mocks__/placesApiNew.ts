/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  LegacyPlaceResult,
  PlacePrediction,
  PlacesApiNewPlace,
} from '../placesTypes'

// Builds a Places API (New) Place equivalent to a legacy PlaceResult fixture.
export function toNewPlace(legacy: any): PlacesApiNewPlace {
  const place: PlacesApiNewPlace = {
    addressComponents: legacy.address_components.map((component: any) => ({
      longText: component.long_name,
      shortText: component.short_name,
      types: component.types,
    })),
    formattedAddress: legacy.formatted_address,
    location: legacy.geometry ? legacy.geometry.location : null,
    fetchFields: jest.fn(() => Promise.resolve({ place })),
  }

  return place
}

export function createPrediction(
  placeId: string,
  mainText: string,
  secondaryText: string,
  place: PlacesApiNewPlace
): PlacePrediction {
  return {
    placeId,
    text: { text: `${mainText}, ${secondaryText}` },
    mainText: { text: mainText },
    secondaryText: { text: secondaryText },
    toPlace: jest.fn(() => place),
  }
}

export class MockAutocompleteSessionToken {}

// Installs the Places API (New) classes on top of @googlemaps/jest-mocks.
export function installPlacesApiNew(googleMaps: any = google.maps) {
  const fetchAutocompleteSuggestions = jest.fn(() =>
    Promise.resolve({ suggestions: [] as any[] })
  )

  const searchByText = jest.fn(() => Promise.resolve({ places: [] as any[] }))

  googleMaps.places.AutocompleteSuggestion = { fetchAutocompleteSuggestions }
  googleMaps.places.AutocompleteSessionToken = MockAutocompleteSessionToken
  googleMaps.places.Place = { searchByText }

  return { fetchAutocompleteSuggestions, searchByText }
}

export function uninstallPlacesApiNew(googleMaps: any = google.maps) {
  delete googleMaps.places.AutocompleteSuggestion
  delete googleMaps.places.AutocompleteSessionToken
  delete googleMaps.places.Place
}

export function withLatLng(
  legacy: LegacyPlaceResult | any,
  lat: number,
  lng: number
) {
  return {
    ...legacy,
    geometry: { location: { lat: () => lat, lng: () => lng } },
  }
}

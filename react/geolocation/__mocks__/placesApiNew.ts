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

const GRPC_STATUS_NAMES: Record<number, string> = {
  7: 'PERMISSION_DENIED',
  8: 'RESOURCE_EXHAUSTED',
  14: 'UNAVAILABLE',
}

// Same shape as the RpcError thrown by Places API (New) in the browser:
// numeric gRPC code, plain message and the reason only in the metadata.
export function createRpcError(code: number, message: string, reason = '') {
  const error: any = new Error(message)

  error.name = 'RpcError'
  error.code = code
  error.metadata = {
    'grpc-web-status-details-bin': JSON.stringify([
      code,
      message,
      reason
        ? [
            [
              'type.googleapis.com/google.rpc.ErrorInfo',
              [
                reason,
                'googleapis.com',
                [['service', 'places.googleapis.com']],
              ],
            ],
          ]
        : [],
    ]),
  }
  error.toString = () =>
    `RpcError(${GRPC_STATUS_NAMES[code] ?? code}): ${message}`

  return error
}

export const apiKeyServiceBlockedError = () =>
  createRpcError(
    7,
    'Requests to this API places.googleapis.com method google.maps.places.v1.Places.AutocompletePlaces are blocked.',
    'API_KEY_SERVICE_BLOCKED'
  )

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

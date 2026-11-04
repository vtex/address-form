import type { LegacyPlaceResult, PlacesApiNewPlace } from './placesTypes'

// Converts a Places API (New) Place into the legacy PlaceResult shape that
// geolocationAutoCompleteAddress and the country geolocation rules expect.
export function toLegacyPlaceResult(
  place: PlacesApiNewPlace
): LegacyPlaceResult {
  const result: LegacyPlaceResult = {
    address_components: (place.addressComponents ?? []).map((component) => ({
      long_name: component.longText ?? '',
      short_name: component.shortText ?? '',
      types: component.types ?? [],
    })),
    formatted_address: place.formattedAddress ?? '',
  }

  if (place.location) {
    result.geometry = { location: place.location }
  }

  return result
}

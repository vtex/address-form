export default function getGeoCoder(mockFn) {
  class Geocoder {
    geocode = mockFn
  }

  return Geocoder
}

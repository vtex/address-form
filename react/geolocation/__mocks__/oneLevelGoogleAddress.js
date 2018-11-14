/* eslint camelcase: 0 */

export default {
  address_components: [
    { long_name: '10', short_name: '10', types: ['street_number'] },
    {
      long_name: 'Calle Brazil',
      short_name: 'Calle Brazil',
      types: ['route'],
    },
    {
      long_name: 'Pucara',
      short_name: 'Pucara',
      types: ['administrative_area_level_2', 'political'],
    },
    {
      long_name: 'Azuay',
      short_name: 'Azuay',
      types: ['administrative_area_level_1', 'political'],
    },
    { long_name: 'Ecuador', short_name: 'EC', types: ['country', 'political'] },
    {
      long_name: '22231',
      short_name: '22231',
      types: ['postal_code_prefix', 'postal_code'],
    },
  ],
  formatted_address: 'Calle Brazil, 10, Pucara, Azuay, Ecuador',
  geometry: {
    location: { lat: -22.941129, lng: -43.18075109999995 },
    viewport: {
      south: -22.9424380802915,
      west: -43.1821367802915,
      north: -22.9397401197085,
      east: -43.17943881970848,
    },
  },
  name: 'Calle Brazil, 10',
}

/* eslint camelcase: 0 */

function postalCodeComponent(longName) {
  return {
    long_name: longName,
    short_name: longName,
    types: ['postal_code_prefix', 'postal_code'],
  }
}

/** Shared Botafogo / Rua Barão de Itambí fixture; differs only by postal_code component value. */
export function createRuaBaraoItambiGoogleAddress(postalLongName) {
  return {
    address_components: [
      { long_name: '55', short_name: '55', types: ['street_number'] },
      {
        long_name: 'Rua Barão de Itambí',
        short_name: 'R. Barão de Itambí',
        types: ['route'],
      },
      {
        long_name: 'Botafogo',
        short_name: 'Botafogo',
        types: ['sublocality_level_1', 'sublocality', 'political'],
      },
      {
        long_name: 'Rio de Janeiro',
        short_name: 'Rio de Janeiro',
        types: ['administrative_area_level_2', 'political'],
      },
      {
        long_name: 'Rio de Janeiro',
        short_name: 'RJ',
        types: ['administrative_area_level_1', 'political'],
      },
      {
        long_name: 'Brasil',
        short_name: 'BR',
        types: ['country', 'political'],
      },
      postalCodeComponent(postalLongName),
    ],
    formatted_address:
      'R. Barão de Itambí, 55 - Botafogo, Rio de Janeiro - RJ, Brasil',
    geometry: {
      location: { lat: -22.941129, lng: -43.18075109999995 },
      viewport: {
        south: -22.9424380802915,
        west: -43.1821367802915,
        north: -22.9397401197085,
        east: -43.17943881970848,
      },
    },
    name: 'R. Barão de Itambí, 55',
  }
}

export default createRuaBaraoItambiGoogleAddress('22231000')

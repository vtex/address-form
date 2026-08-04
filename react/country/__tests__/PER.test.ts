/* eslint camelcase: 0 */
import geolocationAutoCompleteAddress from '../../geolocation/geolocationAutoCompleteAddress'
import newAddress from '../../__mocks__/newAddress'
import rules from '../PER'

interface ComponentSpec {
  streetNumber?: string
  route?: string
  district?: string
  province?: string
  department?: string
  postalCode?: string
}

function createPeruGoogleAddress({
  streetNumber,
  route,
  district,
  province,
  department,
  postalCode,
}: ComponentSpec) {
  const componentsByType: Array<
    [string | undefined, string | undefined, string[]]
  > = [
    [streetNumber, streetNumber, ['street_number']],
    [route, route, ['route']],
    [district, district, ['locality', 'political']],
    [province, province, ['administrative_area_level_2', 'political']],
    [department, department, ['administrative_area_level_1', 'political']],
    ['Peru', 'PE', ['country', 'political']],
    [postalCode, postalCode, ['postal_code']],
  ]

  return {
    address_components: componentsByType
      .filter(([longName]) => longName)
      .map(([longName, shortName, types]) => ({
        long_name: longName,
        short_name: shortName,
        types,
      })),
    formatted_address: 'Peru',
    geometry: {
      location: { lat: -12.046374, lng: -77.042793 },
    },
  }
}

describe('PER geolocation rules', () => {
  it('should fill the ubigeo when Google prefixes the province name', () => {
    // Zendesk #1290373: Google returns CPN 11701 for this address, which
    // is not a valid ubigeo and must never reach the address.
    const address = geolocationAutoCompleteAddress(
      newAddress,
      createPeruGoogleAddress({
        streetNumber: '655',
        route: 'Calle Sucre',
        district: 'Chincha Alta',
        province: 'Provincia de Chincha',
        department: 'Ica',
        postalCode: '11701',
      }),
      rules
    )

    expect(address.state.value).toBe('Ica')
    expect(address.city.value).toBe('Chincha')
    expect(address.neighborhood.value).toBe('Chincha Alta')
    expect(address.postalCode.value).toBe('110201')
  })

  it('should never leak the CPN returned by Google when the district is unknown', () => {
    const address = geolocationAutoCompleteAddress(
      newAddress,
      createPeruGoogleAddress({
        district: 'Distrito Inexistente',
        province: 'Provincia de Chincha',
        department: 'Ica',
        postalCode: '11701',
      }),
      rules
    )

    expect(address.postalCode.value).toBeNull()
  })

  it('should match district names ignoring accents', () => {
    const address = geolocationAutoCompleteAddress(
      newAddress,
      createPeruGoogleAddress({
        district: 'Jesus Maria',
        province: 'Provincia de Lima',
        department: 'Lima',
        postalCode: '15072',
      }),
      rules
    )

    expect(address.state.value).toBe('Lima')
    expect(address.city.value).toBe('Lima')
    expect(address.neighborhood.value).toBe('Jesús María')
    expect(address.postalCode.value).toBe('150113')
  })

  it('should keep the Lima special cases working', () => {
    const address = geolocationAutoCompleteAddress(
      newAddress,
      createPeruGoogleAddress({
        district: 'Distrito de Lima',
        province: 'Provincia de Lima',
        department: 'Provincia de Lima',
      }),
      rules
    )

    expect(address.state.value).toBe('Lima')
    expect(address.city.value).toBe('Lima')
    expect(address.neighborhood.value).toBe('Lima')
    expect(address.postalCode.value).toBe('150101')
  })

  it('should resolve the constitutional province of Callao', () => {
    const address = geolocationAutoCompleteAddress(
      newAddress,
      createPeruGoogleAddress({
        district: 'Bellavista',
        province: 'Provincia Constitucional del Callao',
        department: 'Callao',
        postalCode: '07011',
      }),
      rules
    )

    expect(address.state.value).toBe('Callao')
    expect(address.city.value).toBe('Callao')
    expect(address.neighborhood.value).toBe('Bellavista')
    expect(address.postalCode.value).toBe('070102')
  })

  it('should resolve Callao even when Google attributes it to Lima', () => {
    const address = geolocationAutoCompleteAddress(
      newAddress,
      createPeruGoogleAddress({
        district: 'Mi Perú',
        province: 'Callao',
        department: 'Lima',
      }),
      rules
    )

    expect(address.state.value).toBe('Callao')
    expect(address.city.value).toBe('Callao')
    expect(address.neighborhood.value).toBe('Mi Perú')
    expect(address.postalCode.value).toBe('070107')
  })

  it('should resolve districts added in the INEI 2025 refresh', () => {
    const address = geolocationAutoCompleteAddress(
      newAddress,
      createPeruGoogleAddress({
        district: 'Alto Trujillo',
        province: 'Provincia de Trujillo',
        department: 'La Libertad',
      }),
      rules
    )

    expect(address.state.value).toBe('La Libertad')
    expect(address.city.value).toBe('Trujillo')
    expect(address.neighborhood.value).toBe('Alto Trujillo')
    expect(address.postalCode.value).toBe('130112')
  })

  it('should infer the department from the province when Google omits it', () => {
    const address = geolocationAutoCompleteAddress(
      newAddress,
      createPeruGoogleAddress({
        district: 'Chincha Alta',
        province: 'Provincia de Chincha',
        department: 'Gobierno Regional Desconocido',
        postalCode: '11701',
      }),
      rules
    )

    expect(address.state.value).toBe('Ica')
    expect(address.postalCode.value).toBe('110201')
  })
})

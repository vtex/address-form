import {
  createPostalCodeFromHierarchyHandler,
  findCountryDataKey,
  normalizeGeoName,
  stripGeoLevelPrefix,
} from './geolocationPostalCodeFromHierarchy'
import type { AddressWithValidation, FillableFields } from '../types/address'

const threeLevelData = {
  Ica: {
    Chincha: {
      'Chincha Alta': '110201',
    },
  },
  Callao: {
    Callao: {
      'Mi Perú': '070107',
      Bellavista: '070102',
    },
  },
  Lima: {
    Lima: {
      'Jesús María': '150113',
      Lima: '150101',
    },
  },
}

const twoLevelStateCityData = {
  Amazonas: {
    Leticia: '91001',
  },
}

const twoLevelStateNeighborhoodData = {
  'Región Metropolitana': {
    Alhué: '9650000',
  },
}

function buildAddress(
  values: Partial<Record<FillableFields, string>>
): AddressWithValidation {
  const address = {} as AddressWithValidation

  Object.entries(values).forEach(([field, value]) => {
    address[field as FillableFields] = { value }
  })

  return address
}

describe('stripGeoLevelPrefix / normalizeGeoName / findCountryDataKey', () => {
  it('strips Spanish admin level prefixes', () => {
    expect(stripGeoLevelPrefix('Provincia de Chincha')).toBe('Chincha')
    expect(stripGeoLevelPrefix('Provincia Constitucional del Callao')).toBe(
      'Callao'
    )
    expect(stripGeoLevelPrefix('Distrito de Lima')).toBe('Lima')
    expect(stripGeoLevelPrefix('Región de Antofagasta')).toBe('Antofagasta')
  })

  it('normalizes accents and prefixes for lookup', () => {
    expect(normalizeGeoName('Jesús María')).toBe('jesus maria')
    expect(normalizeGeoName('Provincia de Chincha')).toBe('chincha')
  })

  it('finds canonical keys with or without accents', () => {
    const lima = threeLevelData.Lima.Lima

    expect(findCountryDataKey(lima, 'Jesus Maria')).toBe('Jesús María')
    expect(findCountryDataKey(lima, 'Jesús María')).toBe('Jesús María')
    expect(findCountryDataKey(lima, 'Unknown')).toBeUndefined()
  })
})

describe('createPostalCodeFromHierarchyHandler', () => {
  it('resolves a three-level hierarchy without mutating the input', () => {
    const handler = createPostalCodeFromHierarchyHandler(threeLevelData, [
      'state',
      'city',
      'neighborhood',
    ])

    const address = buildAddress({
      state: 'Ica',
      city: 'Chincha',
      neighborhood: 'Chincha Alta',
    })

    const result = handler(address, {}, 0)

    expect(result).not.toBe(address)
    expect(result.postalCode).toEqual({ value: '110201' })
    expect(address.postalCode).toBeUndefined()
  })

  it('resolves a two-level state and city hierarchy', () => {
    const handler = createPostalCodeFromHierarchyHandler(
      twoLevelStateCityData,
      ['state', 'city']
    )

    const address = buildAddress({
      state: 'Amazonas',
      city: 'Leticia',
    })

    expect(handler(address, {}, 0).postalCode).toEqual({ value: '91001' })
  })

  it('resolves a two-level state and neighborhood hierarchy', () => {
    const handler = createPostalCodeFromHierarchyHandler(
      twoLevelStateNeighborhoodData,
      ['state', 'neighborhood']
    )

    const address = buildAddress({
      state: 'Región Metropolitana',
      neighborhood: 'Alhué',
    })

    expect(handler(address, {}, 0).postalCode).toEqual({ value: '9650000' })
  })

  it('returns the original address when a required field is empty', () => {
    const handler = createPostalCodeFromHierarchyHandler(threeLevelData, [
      'state',
      'city',
      'neighborhood',
    ])

    const address = buildAddress({
      state: 'Ica',
      city: 'Chincha',
    })

    const result = handler(address, {}, 0)

    expect(result).toBe(address)
    expect(result.postalCode).toBeUndefined()
  })

  it('returns the original address when the hierarchy path is unknown', () => {
    const handler = createPostalCodeFromHierarchyHandler(threeLevelData, [
      'state',
      'city',
      'neighborhood',
    ])

    const address = buildAddress({
      state: 'Ica',
      city: 'Chincha',
      neighborhood: 'Unknown',
    })

    const result = handler(address, {}, 0)

    expect(result).toBe(address)
    expect(result.postalCode).toBeUndefined()
  })

  it('resolves prefixed and accented names when normalizeKeys is enabled', () => {
    const handler = createPostalCodeFromHierarchyHandler(
      threeLevelData,
      ['state', 'city', 'neighborhood'],
      { normalizeKeys: true, canonicalizeLevels: true }
    )

    const address = buildAddress({
      state: 'Ica',
      city: 'Provincia de Chincha',
      neighborhood: 'Chincha Alta',
    })

    const result = handler(address, {}, 0)

    expect(result.postalCode).toEqual({ value: '110201' })
    expect(result.state).toEqual({ value: 'Ica' })
    expect(result.city).toEqual({ value: 'Chincha' })
    expect(result.neighborhood).toEqual({ value: 'Chincha Alta' })
  })

  it('falls back across first-level branches when the resolved department is wrong', () => {
    const handler = createPostalCodeFromHierarchyHandler(
      threeLevelData,
      ['state', 'city', 'neighborhood'],
      {
        normalizeKeys: true,
        crossFirstLevelFallback: true,
        canonicalizeLevels: true,
      }
    )

    const address = buildAddress({
      state: 'Lima',
      city: 'Callao',
      neighborhood: 'Mi Perú',
    })

    const result = handler(address, {}, 0)

    expect(result.postalCode).toEqual({ value: '070107' })
    expect(result.state).toEqual({ value: 'Callao' })
    expect(result.city).toEqual({ value: 'Callao' })
    expect(result.neighborhood).toEqual({ value: 'Mi Perú' })
  })

  it('does not cross first-level branches unless the option is enabled', () => {
    const handler = createPostalCodeFromHierarchyHandler(
      threeLevelData,
      ['state', 'city', 'neighborhood'],
      { normalizeKeys: true }
    )

    const address = buildAddress({
      state: 'Lima',
      city: 'Callao',
      neighborhood: 'Mi Perú',
    })

    const result = handler(address, {}, 0)

    expect(result).toBe(address)
    expect(result.postalCode).toBeUndefined()
  })
})

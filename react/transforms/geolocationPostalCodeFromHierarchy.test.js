import { createPostalCodeFromHierarchyHandler } from './geolocationPostalCodeFromHierarchy'

const threeLevelData = {
  Ica: {
    Chincha: {
      'Chincha Alta': '110201',
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

function buildAddress(values) {
  const address = {}

  Object.entries(values).forEach(([field, value]) => {
    address[field] = { value }
  })

  return address
}

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
    const handler = createPostalCodeFromHierarchyHandler(twoLevelStateCityData, [
      'state',
      'city',
    ])
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
})

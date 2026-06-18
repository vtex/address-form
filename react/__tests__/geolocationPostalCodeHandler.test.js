import countries from '../countries'
import {
  buildAddress,
  getAlternateHierarchySample,
  getCountriesWithHierarchyPostalHandler,
  getHierarchySample,
} from './helpers/geolocationPostalCodeHandler'

const countriesWithHandler = getCountriesWithHierarchyPostalHandler(countries)

function describeCountry(countryCode, rules) {
  const handler = rules.geolocation.postalCode.handler
  const sample = getHierarchySample(rules)
  const levels = rules.postalCodeLevels
  const lastLevel = levels[levels.length - 1]

  describe(countryCode, () => {
    it('sets postalCode from the selected administrative hierarchy', () => {
      const address = buildAddress(sample.values)
      const result = handler(address, {}, 0)

      expect(result.postalCode).toEqual({ value: sample.expectedPostal })
    })

    it('returns the address unchanged when a required hierarchy field is empty', () => {
      const address = buildAddress(sample.values, lastLevel)
      const result = handler(address, {}, 0)

      expect(result).toBe(address)
      expect(result.postalCode).toBeUndefined()
    })

    it('returns the address unchanged when the deepest level is not in countryData', () => {
      const invalidValues = {
        ...sample.values,
        [lastLevel]: 'Unknown Administrative Unit',
      }
      const address = buildAddress(invalidValues)
      const result = handler(address, {}, 0)

      expect(result).toBe(address)
      expect(result.postalCode).toBeUndefined()
    })

    const alternateSample = getAlternateHierarchySample(rules)

    if (alternateSample) {
      it('resolves postalCode using the full hierarchy path', () => {
        const firstResult = handler(
          buildAddress(alternateSample.first.values),
          {},
          0
        )
        const secondResult = handler(
          buildAddress(alternateSample.second.values),
          {},
          0
        )

        expect(firstResult.postalCode).toEqual({
          value: alternateSample.first.expectedPostal,
        })
        expect(secondResult.postalCode).toEqual({
          value: alternateSample.second.expectedPostal,
        })
        expect(firstResult.postalCode.value).not.toBe(
          secondResult.postalCode.value
        )
      })
    }
  })
}

describe('geolocation postalCode handler (hierarchy lookup)', () => {
  it('includes at least one country with hierarchy-based postal lookup', () => {
    expect(countriesWithHandler.length).toBeGreaterThan(0)
  })

  countriesWithHandler.forEach(([countryCode, rules]) => {
    describeCountry(countryCode, rules)
  })
})

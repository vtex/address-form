import {
  getPostalCodeOptions,
  getLastLevelField,
  getLevelField,
} from '../selectors/postalCode'
import useOneLevel from '../country/__mocks__/useOneLevel'
import useTwoLevels from '../country/__mocks__/useTwoLevels'
import useThreeLevels from '../country/__mocks__/useThreeLevels'

describe('Field Selectors', () => {
  describe('getPostalCodeOptions()', () => {
    it('with one level', () => {
      const address = {}

      const postalCodes = getPostalCodeOptions(address, useOneLevel)

      expect(postalCodes).toMatchObject([
        { label: 'Azuay', postalCode: '0000' },
        { label: 'Bolivar', postalCode: '0001' },
      ])
    })

    it('with two levels', () => {
      const address = {
        state: { value: 'I Región' },
      }

      const postalCodes = getPostalCodeOptions(address, useTwoLevels)

      expect(postalCodes).toMatchObject([
        { label: 'Camiña', postalCode: '1150000' },
        { label: 'Colchane', postalCode: '1160000' },
        { label: 'Huara', postalCode: '1140000' },
        { label: 'Iquique', postalCode: '1100000' },
        { label: 'Pica', postalCode: '1170000' },
      ])
    })

    it('with three levels', () => {
      const address = {
        state: { value: 'Beni' },
        city: { value: 'Mamore' },
      }

      const postalCodes = getPostalCodeOptions(address, useThreeLevels)

      expect(postalCodes).toMatchObject([
        { label: 'San Ramon', postalCode: '10200' },
      ])
    })
  })

  describe('getLastLevelField()', () => {
    it('with one level', () => {
      const result = getLastLevelField(useOneLevel)

      expect(result.name).toBe('state')
    })

    it('with two levels', () => {
      const result = getLastLevelField(useTwoLevels)

      expect(result.name).toBe('neighborhood')
    })

    it('with three levels', () => {
      const result = getLastLevelField(useThreeLevels)

      expect(result.name).toBe('neighborhood')
    })

    it('should throw when postalCodeFrom is not handled', () => {
      const act = () => getLastLevelField({ postalCodeFrom: 'foo' })

      expect(act).toThrow()
    })
  })

  describe('getLevelField()', () => {
    it('should get the right field', () => {
      const level = 0
      const rules = {
        postalCodeLevels: ['foo'],
        fields: [{ name: 'foo', label: 'Bar' }],
      }

      const result = getLevelField(level, rules)

      expect(result.label).toBe('Bar')
    })
  })
})

import {
  getPostalCodeOptions,
  getLevels,
  getCurrentLevelField,
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

  describe('getLevels()', () => {
    it('should return an object with fields', () => {
      const result = getLevels(useOneLevel)

      expect(Object.keys(result)).toEqual(expect.arrayContaining(['levels']))
    })

    it('with one level', () => {
      const result = getLevels(useOneLevel)

      expect(result.levels[0]).toBeDefined()
      expect(result.levels[1]).toBeUndefined()
      expect(result.levels[2]).toBeUndefined()
      expect(result.levels[0].name).toEqual('state')
    })

    it('with two levels', () => {
      const result = getLevels(useTwoLevels)

      expect(result.levels[0]).toBeDefined()
      expect(result.levels[1]).toBeDefined()
      expect(result.levels[2]).toBeUndefined()
      expect(result.levels[0].name).toEqual('state')
      expect(result.levels[1].name).toEqual('neighborhood')
    })

    it('with three levels', () => {
      const result = getLevels(useThreeLevels)

      expect(result.levels[0]).toBeDefined()
      expect(result.levels[1]).toBeDefined()
      expect(result.levels[2]).toBeDefined()
      expect(result.levels[0].name).toEqual('state')
      expect(result.levels[1].name).toEqual('city')
      expect(result.levels[2].name).toEqual('neighborhood')
    })
  })

  describe('getCurrentLevelField()', () => {
    it('with one level', () => {
      const expected = 'expected'
      const result = getCurrentLevelField(
        [expected, undefined, undefined],
        useOneLevel
      )

      expect(result).toBe(expected)
    })

    it('with two levels', () => {
      const expected = 'expected'
      const result = getCurrentLevelField(
        [null, expected, undefined],
        useTwoLevels
      )

      expect(result).toBe(expected)
    })

    it('with three levels', () => {
      const expected = 'expected'
      const result = getCurrentLevelField(
        [null, null, expected],
        useThreeLevels
      )

      expect(result).toBe(expected)
    })

    it('should throw when postalCodeFrom is not handled', () => {
      const act = () => getCurrentLevelField([], { postalCodeFrom: 'foo' })

      expect(act).toThrow()
    })
  })
})

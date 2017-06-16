import {
  getField,
  hasOptions,
  getListOfOptions,
  getDependentFields,
  filterFields,
} from './fields'
import { STATE, POSTAL_CODE } from '../constants'
import diff from 'lodash/difference'
import useOneLevel from '../country/__mocks__/useOneLevel'
import useTwoLevels from '../country/__mocks__/useTwoLevels'
import useThreeLevels from '../country/__mocks__/useThreeLevels'

describe('Field Selectors', () => {
  it('getField()', () => {
    const rules = {
      fields: [
        { name: 'postalCode', label: 'zipCode' },
        { name: 'city', label: 'community' },
      ],
    }

    const field = getField('city', rules)

    expect(field.label).toBe('community')
  })

  describe('hasOptions()', () => {
    it('for field with options', () => {
      const field = {
        name: 'state',
        options: ['PE', 'SP'],
      }

      const result = hasOptions(field)

      expect(result).toBe(true)
    })

    it('for field with optionsPairs', () => {
      const field = {
        name: 'state',
        optionsPairs: [
          { value: 'PE', label: 'Pernambuco' },
          { value: 'SP', label: 'São Paulo' },
        ],
      }

      const result = hasOptions(field)

      expect(result).toBe(true)
    })

    it('for field with optionsMap', () => {
      const field = {
        name: 'state',
        optionsMap: {
          PE: ['Recife', 'Olinda'],
          SP: ['São Paulo', 'Santos'],
        },
      }

      const result = hasOptions(field)

      expect(result).toBe(true)
    })
  })

  describe('getListOfOptions()', () => {
    it('field with options should get an object of value and label', () => {
      const field = {
        name: 'state',
        options: ['PE', 'SP'],
      }
      const address = {}
      const rules = {}

      const options = getListOfOptions(field, address, rules)

      expect(options[0]).toMatchObject({ value: 'PE', label: 'PE' })
    })

    it('field with optionsPairs should return its optionsPairs', () => {
      const field = {
        name: 'state',
        optionsPairs: [
          { value: 'PE', label: 'Pernambuco' },
          { value: 'SP', label: 'São Paulo' },
        ],
      }
      const address = {}
      const rules = {}

      const options = getListOfOptions(field, address, rules)

      expect(options[0]).toMatchObject({ value: 'PE', label: 'Pernambuco' })
    })

    it('field with optionsMap level 2 should get options based on other field value', () => {
      const field = {
        name: 'city',
        basedOn: 'state',
        level: 2,
        optionsMap: {
          PE: ['Recife', 'Olinda'],
          SP: ['São Paulo', 'Santos'],
        },
      }
      const address = { state: 'PE' }
      const rules = {}

      const options = getListOfOptions(field, address, rules)

      expect(options[0]).toMatchObject({ value: 'Recife', label: 'Recife' })
    })

    it('field with optionsMap level 3 should get options based on other field value', () => {
      const field = {
        name: 'neighborhood',
        basedOn: 'city',
        level: 3,
        optionsMap: {
          PE: {
            Recife: ['Boa Viagem', 'Casa Forte'],
          },
        },
      }
      const address = { state: 'PE', city: 'Recife' }
      const rules = {
        postalCodeFrom: POSTAL_CODE,
        fields: [{ name: 'city', basedOn: 'state' }, { name: 'state' }],
      }

      const options = getListOfOptions(field, address, rules)

      expect(options[0]).toMatchObject({
        value: 'Boa Viagem',
        label: 'Boa Viagem',
      })
    })
  })

  describe('getDependentFields()', () => {
    it('with one level', () => {
      const rules = {
        postalCodeFrom: POSTAL_CODE,
        fields: [{ basedOn: 'state', name: 'city' }],
      }

      const dependentFields = getDependentFields('state', rules)

      expect(dependentFields).toMatchObject(['city'])
    })

    it('with two levels', () => {
      const rules = {
        postalCodeFrom: POSTAL_CODE,
        fields: [
          { basedOn: 'state', name: 'city' },
          { basedOn: 'city', name: 'neighborhood' },
        ],
      }

      const dependentFields = getDependentFields('state', rules)

      expect(dependentFields).toMatchObject(['city', 'neighborhood'])
    })

    it('postal code based on a field', () => {
      const rules = {
        postalCodeFrom: STATE,
        fields: [],
      }

      const dependentFields = getDependentFields('state', rules)

      expect(dependentFields).toMatchObject(['postalCode'])
    })
  })

  describe('filterFields()', () => {
    function getFieldNames(fields) {
      return fields.map(({ name }) => name)
    }

    it('should filter when postal code is from postal code', () => {
      const fields = filterFields(useOneLevel)

      expect(
        diff(getFieldNames(useOneLevel.fields), getFieldNames(fields))
      ).toMatchSnapshot()
    })

    it('should filter when postal code is from state', () => {
      const fields = filterFields(useTwoLevels)

      expect(
        diff(getFieldNames(useTwoLevels.fields), getFieldNames(fields))
      ).toMatchSnapshot()
    })

    it('should filter when postal code is from city', () => {
      const fields = filterFields(useThreeLevels)

      expect(
        diff(getFieldNames(useThreeLevels.fields), getFieldNames(fields))
      ).toMatchSnapshot()
    })
  })
})

import diff from 'lodash/difference'

import {
  getField,
  hasOptions,
  getListOfOptions,
  getDependentFields,
  filterPostalCodeFields,
  filterAutoCompletedFields,
  isDefiningPostalCodeField,
  getFieldLabel,
} from './fields'
import { ONE_LEVEL, TWO_LEVELS, POSTAL_CODE } from '../constants'
import useOneLevel from '../country/__mocks__/useOneLevel'
import useTwoLevels from '../country/__mocks__/useTwoLevels'
import useThreeLevels from '../country/__mocks__/useThreeLevels'
import type { PostalCodeRules, PostalCodeFieldRule } from '../types/rules'
import type { AddressWithValidation } from '../types/address'

describe('Field Selectors', () => {
  it('getField()', () => {
    const rules: PostalCodeRules = {
      country: null,
      abbr: null,
      fields: [
        { name: 'postalCode', label: 'zipCode' },
        { name: 'city', label: 'community' },
      ],
    }

    const field = getField('city', rules) as PostalCodeFieldRule

    expect(getFieldLabel(field)).toBe('community')
  })

  describe('hasOptions()', () => {
    it('for field with options', () => {
      const field: PostalCodeFieldRule = {
        name: 'state',
        label: 'state',
        options: ['PE', 'SP'],
      }

      const result = hasOptions(field)

      expect(result).toBe(true)
    })

    it('for field with optionsPairs', () => {
      const field: PostalCodeFieldRule = {
        name: 'state',
        label: 'state',
        optionsPairs: [
          { value: 'PE', label: 'Pernambuco' },
          { value: 'SP', label: 'São Paulo' },
        ],
      }

      const result = hasOptions(field)

      expect(result).toBe(true)
    })

    it('for field with optionsMap', () => {
      const field: PostalCodeFieldRule = {
        name: 'state',
        label: 'state',
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
      const field: PostalCodeFieldRule = {
        name: 'state',
        label: 'state',
        options: ['PE', 'SP'],
      }

      const address = {} as AddressWithValidation
      const rules = {} as PostalCodeRules

      const options = getListOfOptions(field, address, rules)

      expect(options[0]).toMatchObject({ value: 'PE', label: 'PE' })
    })

    it('field with optionsPairs should return its optionsPairs', () => {
      const field: PostalCodeFieldRule = {
        name: 'state',
        label: 'state',
        optionsPairs: [
          { value: 'PE', label: 'Pernambuco' },
          { value: 'SP', label: 'São Paulo' },
        ],
      }

      const address = {} as AddressWithValidation
      const rules = {} as PostalCodeRules

      const options = getListOfOptions(field, address, rules)

      expect(options[0]).toMatchObject({ value: 'PE', label: 'Pernambuco' })
    })

    it('field with optionsMap level 2 should get options based on other field value', () => {
      const field: PostalCodeFieldRule = {
        name: 'city',
        label: 'city',
        basedOn: 'state',
        level: 2,
        optionsMap: {
          Antioquia: ['Barranco Minas', 'Cacahual'],
        },
      }

      const address = { state: { value: 'ANTIOQUIA' } } as AddressWithValidation
      const rules = {} as PostalCodeRules

      const options = getListOfOptions(field, address, rules)

      expect(options[0]).toMatchObject({
        value: 'Barranco Minas',
        label: 'Barranco Minas',
      })
    })

    it('field with optionsMap level 3 should get options based on other field value', () => {
      const field: PostalCodeFieldRule = {
        name: 'neighborhood',
        label: 'neighborhood',
        basedOn: 'city',
        level: 3,
        optionsMap: {
          PE: {
            Recife: ['Boa Viagem', 'Casa Forte'],
          },
        },
      }

      const address = {
        state: { value: 'PE' },
        city: { value: 'Recife' },
      } as AddressWithValidation

      const rules = {
        postalCodeFrom: POSTAL_CODE,
        fields: [{ name: 'city', basedOn: 'state' }, { name: 'state' }],
      } as PostalCodeRules

      const options = getListOfOptions(field, address, rules)

      expect(options[0]).toMatchObject({
        value: 'Boa Viagem',
        label: 'Boa Viagem',
      })
    })

    it('should filter options suggested by postal code service', () => {
      const stateField: PostalCodeFieldRule = {
        name: 'state',
        label: 'state',
        options: ['Foo', 'Bar', 'Zoo'],
      }

      const address = {
        state: { value: null, valueOptions: ['Bar', 'Too'] },
      } as AddressWithValidation

      const rules = {
        postalCodeFrom: POSTAL_CODE,
        fields: [stateField],
      } as PostalCodeRules

      const options = getListOfOptions(stateField, address, rules)

      expect(options).toHaveLength(1)
      expect(options[0]).toMatchObject({
        value: 'Bar',
        label: 'Bar',
      })
    })

    it('should fix options suggested by postal code service', () => {
      const stateField: PostalCodeFieldRule = {
        name: 'state',
        label: 'state',
        options: ['Foo', 'Bar', 'Zóo'],
      }

      const address = {
        state: { value: null, valueOptions: ['Bar', 'zoo'] },
      } as AddressWithValidation

      const rules = {
        postalCodeFrom: POSTAL_CODE,
        fields: [stateField],
      } as PostalCodeRules

      const options = getListOfOptions(stateField, address, rules)

      expect(options).toHaveLength(2)
      expect(options[1]).toMatchObject({
        value: 'Zóo',
        label: 'Zóo',
      })
    })

    it('should not display options if basedOn field is not filled', () => {
      const stateField: PostalCodeFieldRule = {
        name: 'state',
        label: 'state',
        options: ['Foo', 'Bar', 'Zóo'],
      }

      const cityField: PostalCodeFieldRule = {
        name: 'city',
        label: 'city',
        basedOn: 'state',
        level: 2,
        optionsMap: { Foo: ['Foolite'], Bar: ['Bartoo'] },
      }

      const address = {
        state: { value: null, valueOptions: ['Bar', 'zoo'] },
        city: { value: null, valueOptions: ['Foolite', 'Bartoo'] },
      } as AddressWithValidation

      const rules = {
        postalCodeFrom: POSTAL_CODE,
        fields: [stateField, cityField],
      } as PostalCodeRules

      const options = getListOfOptions(cityField, address, rules)

      expect(options).toHaveLength(0)
    })

    it('should display only the suggested options of the basedOn field', () => {
      const stateField: PostalCodeFieldRule = {
        name: 'state',
        label: 'state',
        options: ['Foo', 'Bar', 'Zóo'],
      }

      const cityField: PostalCodeFieldRule = {
        name: 'city',
        label: 'city',
        basedOn: 'state',
        level: 2,
        optionsMap: { Foo: ['Foolite'], Bar: ['Bartoo'] },
      }

      const address = {
        state: { value: 'Bar', valueOptions: ['Bar', 'zoo'] },
        city: { value: null, valueOptions: ['Foolite', 'Bartoo'] },
      } as AddressWithValidation

      const rules = {
        postalCodeFrom: POSTAL_CODE,
        fields: [stateField, cityField],
      } as PostalCodeRules

      const options = getListOfOptions(cityField, address, rules)

      expect(options).toHaveLength(1)
    })
  })

  describe('getDependentFields()', () => {
    it('with one level', () => {
      const rules = {
        postalCodeFrom: POSTAL_CODE,
        fields: [{ basedOn: 'state', name: 'city' }],
      } as PostalCodeRules

      const dependentFields = getDependentFields('state', rules)

      expect(dependentFields).toHaveLength(1)
      expect(dependentFields).toMatchObject(['city'])
    })

    it('with two levels', () => {
      const rules = {
        postalCodeFrom: POSTAL_CODE,
        fields: [
          { basedOn: 'state', name: 'city' },
          { basedOn: 'city', name: 'neighborhood' },
        ],
      } as PostalCodeRules

      const dependentFields = getDependentFields('state', rules)

      expect(dependentFields).toHaveLength(2)
      expect(dependentFields).toMatchObject(['city', 'neighborhood'])
    })

    it('postal code based on a field', () => {
      const rules = {
        country: null,
        abbr: null,
        postalCodeFrom: ONE_LEVEL,
        postalCodeLevels: ['state'],
        fields: [],
      } as PostalCodeRules

      const dependentFields = getDependentFields('state', rules)

      expect(dependentFields).toHaveLength(1)
      expect(dependentFields).toMatchObject(['postalCode'])
    })

    it("should not clear any if it's a field that doesn't define a postal code", () => {
      const rules = {
        country: null,
        abbr: null,
        postalCodeFrom: TWO_LEVELS,
        postalCodeLevels: ['state', 'city'],
        fields: [],
      } as PostalCodeRules

      const dependentFields = getDependentFields('street', rules)

      expect(dependentFields).toHaveLength(0)
    })
  })

  describe('filterPostalCodeFields()', () => {
    function getFieldNames(fields) {
      return fields.map(({ name }) => name)
    }

    it('should filter when postal code is from postal code', () => {
      const fields = filterPostalCodeFields(useOneLevel)

      expect(
        diff(getFieldNames(useOneLevel.fields), getFieldNames(fields))
      ).toMatchSnapshot()
    })

    it('should filter when postal code is from state', () => {
      const fields = filterPostalCodeFields(useTwoLevels)

      expect(
        diff(getFieldNames(useTwoLevels.fields), getFieldNames(fields))
      ).toMatchSnapshot()
    })

    it('should filter when postal code is from city', () => {
      const fields = filterPostalCodeFields(useThreeLevels)

      expect(
        diff(getFieldNames(useThreeLevels.fields), getFieldNames(fields))
      ).toMatchSnapshot()
    })
  })

  describe('isDefiningPostalCodeField()', () => {
    it('when rules have postalCodeLevels', () => {
      const rules: PostalCodeRules = {
        country: null,
        abbr: null,
        postalCodeLevels: ['state', 'city', 'neighborhood'],
        fields: [],
      }

      const result = isDefiningPostalCodeField('neighborhood', rules)

      expect(result).toBe(true)
    })
  })

  describe('filterAutoCompletedFields()', () => {
    it('should filter auto completed fields', () => {
      const address = ({
        neighborhood: { value: 'Botafogo', geolocationAutoCompleted: true },
        city: { value: 'Rio de Janeiro', postalCodeAutoCompleted: true },
        state: { value: 'RJ' },
      } as unknown) as AddressWithValidation

      const rules = {
        fields: [{ name: 'neighborhood' }, { name: 'city' }, { name: 'state' }],
      } as PostalCodeRules

      const result = filterAutoCompletedFields(rules, address)

      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('state')
    })
  })
})

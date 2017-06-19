import validateAddress, { validateField } from './validateAddress'
import address from './__mocks__/newAddress'
import reduce from 'lodash/reduce'
import usePostalCode from './country/__mocks__/usePostalCode'
import {
  EEMPTY,
  EADDRESSTYPE,
  ENOTOPTION,
  ECOUNTRY,
  EGEOCOORDS,
  EPOSTALCODE,
} from './constants.js'

describe('Address Validation:', () => {
  const baseRequiredFields = ['addressId', 'addressType', 'country']

  function getRulesRequiredFields(rules, withBaseRequiredFields = true) {
    return rules.fields.reduce(
      (acc, field) => (field.required ? acc.concat([field.name]) : acc),
      withBaseRequiredFields ? baseRequiredFields : []
    )
  }

  function getAllInvalidFieldsNames(validationResult) {
    return reduce(
      validationResult,
      (acc, value, field) => (value.valid ? acc : acc.concat([field])),
      []
    )
  }

  it('should have all required fields as invalid when an empty address is submitted', () => {
    const requiredFields = getRulesRequiredFields(usePostalCode)

    const result = validateAddress(
      {
        ...address,
        addressId: null,
        addressType: null,
      },
      usePostalCode
    )

    const invalidFields = getAllInvalidFieldsNames(result)

    expect(result.addressId.valid).toBe(false)
    expect(result.addressId.reason).toBe(EEMPTY)
    expect(result.addressType.reason).toBe(EADDRESSTYPE)
    expect(invalidFields).toEqual(expect.arrayContaining(requiredFields))
  })

  it('should validate a country', () => {
    const result = validateField('BRA', 'country', address, usePostalCode)

    expect(result.valid).toBe(true)
  })

  it('should invalidate an invalid country', () => {
    const result = validateField('Brazil', 'country', address, usePostalCode)

    expect(result.valid).toBe(false)
    expect(result.reason).toBe(ECOUNTRY)
  })

  it('should validate if a state is a valid option', () => {
    const rules = {
      fields: [
        {
          name: 'state',
          required: true,
          options: ['AM'],
        },
      ],
    }

    const validOption = validateField('AM', 'state', address, rules)

    expect(validOption.valid).toBe(true)
  })

  it('should invalidate if a state is not an option', () => {
    const rules = {
      fields: [
        {
          name: 'state',
          required: true,
          options: ['AM'],
        },
      ],
    }

    const invalidOption = validateField('PE', 'state', address, rules)

    expect(invalidOption.valid).toBe(false)
    expect(invalidOption.reason).toBe(ENOTOPTION)
  })

  it('should validate if a state is a valid option in optionsPairs', () => {
    const rules = {
      fields: [
        {
          name: 'state',
          required: true,
          optionsPairs: [{ value: 'AM', label: 'Amazon' }],
        },
      ],
    }

    const validOption = validateField('AM', 'state', address, rules)

    expect(validOption.valid).toBe(true)
  })

  it('should invalidate if a state is a valid option in optionsPairs', () => {
    const rules = {
      fields: [
        {
          name: 'state',
          required: true,
          optionsPairs: [{ value: 'AM', label: 'Amazon' }],
        },
      ],
    }

    const invalidOption = validateField('PE', 'state', address, rules)

    expect(invalidOption.valid).toBe(false)
    expect(invalidOption.reason).toBe(ENOTOPTION)
  })

  it('should validate if a city is a valid option in optionsMap', () => {
    const rules = {
      fields: [
        {
          name: 'state',
          required: true,
          level: 1,
          optionsPairs: [{ value: 'AM', label: 'Amazon' }],
        },
        {
          name: 'city',
          required: true,
          basedOn: 'state',
          level: 2,
          optionsMap: {
            AM: ['Manaus'],
          },
        },
      ],
    }

    const validAddress = {
      ...address,
      city: 'Manaus',
      state: 'AM',
    }

    const validOption = validateField('Manaus', 'city', validAddress, rules)

    expect(validOption.valid).toBe(true)
  })

  it('should invalidate if a city is a valid option in optionsMap', () => {
    const rules = {
      fields: [
        {
          name: 'state',
          required: true,
          level: 1,
          optionsPairs: [{ value: 'AM', label: 'Amazon' }],
        },
        {
          name: 'city',
          required: true,
          basedOn: 'state',
          level: 2,
          optionsMap: {
            AM: ['Manaus'],
          },
        },
      ],
    }

    const invalidAddress = {
      ...address,
      city: 'Foo',
      state: 'AM',
    }

    const invalidOption = validateField('Foo', 'city', invalidAddress, rules)

    expect(invalidOption.valid).toBe(false)
    expect(invalidOption.reason).toBe(ENOTOPTION)
  })

  it('should validate geocoordinates', () => {
    const validGeoCoords = [-22.9443504, -43.184752]

    const validResult = validateField(
      validGeoCoords,
      'geoCoordinates',
      address,
      usePostalCode
    )

    expect(validResult.valid).toBe(true)
  })

  it('should invalidate geocoordinates', () => {
    const invalidGeoCoords = [10]

    const invalidResult = validateField(
      invalidGeoCoords,
      'geoCoordinates',
      address,
      usePostalCode
    )

    expect(invalidResult.valid).toBe(false)
    expect(invalidResult.reason).toBe(EGEOCOORDS)
  })

  it('should invalidate postal code', () => {
    const invalidPostalCode = '222'

    const result = validateField(
      invalidPostalCode,
      'postalCode',
      address,
      usePostalCode
    )

    expect(result.valid).toBe(false)
    expect(result.reason).toBe(EPOSTALCODE)
  })

  it('should validate postal code', () => {
    const validPostalCode = '22250040'

    const result = validateField(
      validPostalCode,
      'postalCode',
      address,
      usePostalCode
    )

    expect(result.valid).toBe(true)
  })

  it("should validate postal code when country doesn't define a regex", () => {
    const rules = {
      fields: [
        {
          name: 'postalCode',
          required: true,
        },
      ],
    }

    const validPostalCode = '1'

    const result = validateField(validPostalCode, 'postalCode', address, rules)

    expect(result.valid).toBe(true)
  })

  it('should log a console.warn when is not an address field', () => {
    const validate = () =>
      validateField(null, 'invalidProperty', address, usePostalCode)

    expect(validate).toThrow(/Unexpected field invalidProperty/)
  })
})

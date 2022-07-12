import reduce from 'lodash/reduce'

import {
  isValidAddress,
  validateAddress,
  validateChangedFields,
  validateField,
} from './validateAddress'
import address from './__mocks__/newAddress'
import geolocationAddress from './__mocks__/geolocationAddress2'
import usePostalCode from './country/__mocks__/usePostalCode'
import {
  EEMPTY,
  EADDRESSTYPE,
  ENOTOPTION,
  ECOUNTRY,
  EGEOCOORDS,
  EPOSTALCODE,
  TWO_LEVELS,
} from './constants'
import * as mockMetrics from './metrics'
import type { PostalCodeRules } from './types/rules'
import type { AddressWithValidation, FillableFields } from './types/address'
import { addNewField } from './transforms/address'

jest.mock('./metrics', () => ({
  logGeolocationAddressMismatch: jest.fn(),
}))

describe('Address Validation:', () => {
  const baseRequiredFields = ['addressId', 'addressType', 'country']

  function getRulesRequiredFields({
    rules,
    withBaseRequiredFields = true,
  }: {
    rules: PostalCodeRules
    withBaseRequiredFields?: boolean
  }) {
    return rules.fields.reduce(
      (acc, field) => (field.required ? acc.concat([field.name]) : acc),
      withBaseRequiredFields ? [...baseRequiredFields] : []
    )
  }

  function getAllInvalidFieldsNames(validationResult: AddressWithValidation) {
    return reduce(
      validationResult,
      (acc, value, field) => (value.valid ? acc : acc.concat([field])),
      [] as string[]
    )
  }

  it('should have all required fields as invalid when an empty address is submitted', () => {
    const requiredFields = getRulesRequiredFields({ rules: usePostalCode })

    const result = validateAddress(
      {
        ...address,
        addressId: { value: null },
        addressType: { value: null },
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
      country: 'BRA',
      abbr: 'BR',
      fields: [
        {
          name: 'state' as const,
          label: 'state',
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
      country: 'BRA',
      abbr: 'BR',
      fields: [
        {
          name: 'state' as const,
          label: 'state',
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
      country: 'BRA',
      abbr: 'BR',
      fields: [
        {
          name: 'state' as const,
          label: 'state',
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
      country: 'BRA',
      abbr: 'BR',
      fields: [
        {
          name: 'state' as const,
          label: 'state',
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
      country: 'BRA',
      abbr: 'BR',
      fields: [
        {
          name: 'state' as const,
          label: 'state',
          required: true,
          level: 1,
          optionsPairs: [{ value: 'AM', label: 'Amazon' }],
        },
        {
          name: 'city' as const,
          label: 'city',
          required: true,
          basedOn: 'state' as const,
          level: 2,
          optionsMap: {
            AM: ['Manaus'],
          },
        },
      ],
    }

    const validAddress = {
      ...address,
      city: { value: 'Manaus' },
      state: { value: 'AM' },
    }

    const validOption = validateField('Manaus', 'city', validAddress, rules)

    expect(validOption.valid).toBe(true)
  })

  it('should validate if a city is a valid option in optionsMap even if city or state has not the same case', () => {
    const rules = {
      country: 'BRA',
      abbr: 'BR',
      fields: [
        {
          name: 'state' as const,
          label: 'state',
          required: true,
          level: 1,
          optionsPairs: [{ value: 'Amazon', label: 'Amazon' }],
        },
        {
          name: 'city' as const,
          label: 'city',
          required: true,
          basedOn: 'state' as const,
          level: 2,
          optionsMap: {
            Amazon: ['Manaus'],
          },
        },
      ],
    }

    const validAddress = {
      ...address,
      city: { value: 'Manaus' },
      state: { value: 'AMAZON' },
    }

    const validcityOption = validateField('MANAUS', 'city', validAddress, rules)
    const validStateOption = validateField(
      'AMAZON',
      'state',
      validAddress,
      rules
    )

    expect(validcityOption.valid).toBe(true)
    expect(validStateOption.valid).toBe(true)
  })

  it('should invalidate if a city is a valid option in optionsMap', () => {
    const rules = {
      country: 'BRA',
      abbr: 'BR',
      fields: [
        {
          name: 'state' as const,
          label: 'state',
          required: true,
          level: 1,
          optionsPairs: [{ value: 'AM', label: 'Amazon' }],
        },
        {
          name: 'city' as const,
          label: 'city',
          required: true,
          basedOn: 'state' as const,
          level: 2,
          optionsMap: {
            AM: ['Manaus'],
          },
        },
      ],
    }

    const invalidAddress = {
      ...address,
      city: { value: 'Foo' },
      state: { value: 'AM' },
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
      country: 'BRA',
      abbr: 'BR',
      fields: [
        {
          name: 'postalCode' as const,
          label: 'postalCode',
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
      validateField(
        null,
        ('invalidProperty' as unknown) as FillableFields,
        address,
        usePostalCode
      )

    expect(validate).toThrow(/Unexpected field invalidProperty/)
  })

  it('should only validate changed fields', () => {
    const changedFields = {
      city: { value: 'Foo', visited: true },
      state: { value: null, valid: true },
    }

    const result = validateChangedFields(changedFields, address, usePostalCode)

    expect(result.city.valid).toBe(true)
    expect(result.state.valid).toBe(true)
  })

  it('should show valid when changed field is not visited', () => {
    const changedFields = {
      postalCode: { value: '22231000' },
    }

    const result = validateChangedFields(changedFields, address, usePostalCode)

    expect(result.postalCode.valid).toBe(true)
  })

  it("should not show validation when changed field is not visited and it's invalid", () => {
    const changedFields = {
      postalCode: { value: '2' },
    }

    const result = validateChangedFields(changedFields, address, usePostalCode)

    expect(result.postalCode.valid).toBeUndefined()
  })

  it('should keep valid fields', () => {
    const changedFieldsValid = {
      postalCode: { value: '22231000' },
    }

    const validatedAddress = validateChangedFields(
      changedFieldsValid,
      address,
      usePostalCode
    )

    const changedFieldsValid2 = {
      postalCode: { value: '22231001' },
    }

    const result = validateChangedFields(
      changedFieldsValid2,
      validatedAddress,
      usePostalCode
    )

    expect(result.postalCode.valid).toBe(true)
  })

  it('should invalidate field when it was validated before being visited', () => {
    const changedFieldsValid = {
      postalCode: { value: '22231000' },
    }

    const validatedAddress = validateChangedFields(
      changedFieldsValid,
      address,
      usePostalCode
    )

    const changedFieldsInvalid = {
      postalCode: { value: '2' },
    }

    const result = validateChangedFields(
      changedFieldsInvalid,
      validatedAddress,
      usePostalCode
    )

    expect(result.postalCode.valid).toBe(false)
  })
})

describe('Geolocation', () => {
  beforeEach(() => {
    ;(mockMetrics.logGeolocationAddressMismatch as jest.MockedFunction<
      typeof import('./metrics').logGeolocationAddressMismatch
    >).mockClear()
  })

  it("should not log if there's no mismatch", () => {
    const rules: PostalCodeRules = {
      country: 'ARG',
      abbr: 'AR',
      fields: [
        {
          name: 'state' as const,
          label: 'state',
          required: true,
          options: ['Santa Fe'],
        },
        {
          name: 'city' as const,
          label: 'city',
          required: true,
          basedOn: 'state' as const,
          optionsMap: { 'Santa Fe': ['Rosario'] },
        },
      ],
    }

    const validOption = validateField(
      geolocationAddress.state.value,
      'state',
      geolocationAddress,
      rules
    )

    expect(validOption.valid).toBe(true)
    expect(mockMetrics.logGeolocationAddressMismatch).toBeCalledTimes(0)
  })

  it('should log state mismatch', () => {
    const rules: PostalCodeRules = {
      country: 'ARG',
      abbr: 'AR',
      fields: [
        {
          name: 'state' as const,
          label: 'state',
          required: true,
          options: ['Santa Fé'],
        },
        {
          name: 'city' as const,
          label: 'city',
          required: true,
          basedOn: 'state' as const,
          optionsMap: { 'Santa Fé': ['Rosario'] },
        },
      ],
    }

    const validOption = validateField(
      geolocationAddress.state.value,
      'state',
      geolocationAddress,
      rules
    )

    expect(validOption.valid).toBe(false)
    expect(mockMetrics.logGeolocationAddressMismatch).toBeCalledTimes(1)
  })

  it('should log city mismatch', () => {
    const rules: PostalCodeRules = {
      country: 'ARG',
      abbr: 'AR',
      fields: [
        {
          name: 'state' as const,
          label: 'state',
          required: true,
          options: ['Santa Fe'],
        },
        {
          name: 'city' as const,
          label: 'city',
          required: true,
          optionsMap: { 'Santa Fe': ['Rosário'] },
          basedOn: 'state' as const,
          level: 2,
        },
      ],
    }

    const validOption = validateField(
      geolocationAddress.city.value,
      'city',
      geolocationAddress,
      rules
    )

    expect(validOption.valid).toBe(false)
    expect(mockMetrics.logGeolocationAddressMismatch).toBeCalledTimes(1)
  })

  it('should not log city mismatch if state is also a mismatch', () => {
    const rules: PostalCodeRules = {
      country: 'ARG',
      abbr: 'AR',
      fields: [
        {
          name: 'state' as const,
          label: 'state',
          required: true,
          options: ['Santa Fé'],
        },
        {
          name: 'city' as const,
          label: 'city',
          required: true,
          optionsMap: { 'Santa Fé': ['Rosário'] },
          basedOn: 'state' as const,
          level: 2,
        },
      ],
    }

    const validOption = validateField(
      geolocationAddress.city.value,
      'city',
      geolocationAddress,
      rules
    )

    expect(validOption.valid).toBe(false)
    expect(mockMetrics.logGeolocationAddressMismatch).toBeCalledTimes(0)
  })

  it('should log neighborhood mismatch based on state', () => {
    const rules: PostalCodeRules = {
      country: 'CHL',
      abbr: 'CL',
      fields: [
        {
          name: 'state',
          label: 'state',
          required: true,
          options: ['Región Metropolitana'],
          level: 1,
        },
        {
          name: 'neighborhood',
          label: 'neighborhood',
          required: true,
          optionsMap: { 'Región Metropolitana': ['Alhué'] },
          basedOn: 'state',
          level: 2,
        },
        {
          name: 'city',
          label: 'state',
          required: true,
        },
      ],
    }

    const myAddress = addNewField(
      ({
        state: { value: 'Región Metropolitana' },
        neighborhood: { value: 'Non-existent neighborhood' },
        city: { value: 'Talca' },
      } as unknown) as AddressWithValidation,
      'geolocationAutoCompleted',
      true
    )

    const result = validateField(
      myAddress.neighborhood.value,
      'neighborhood',
      myAddress,
      rules
    )

    expect(result.valid).toBe(false)
    expect(mockMetrics.logGeolocationAddressMismatch).toHaveBeenCalledTimes(1)
    expect(mockMetrics.logGeolocationAddressMismatch).toHaveBeenCalledWith(
      expect.objectContaining({
        fieldValue: 'Non-existent neighborhood',
        fieldName: 'neighborhood',
      })
    )
  })
})

describe('isValidAddress()', () => {
  it('should tell if an address is invalid', () => {
    const invalidAddress = {
      ...address,
      postalCode: { value: '22231000' },
      city: { value: 'Rio de Janeiro' },
      street: { value: '' },
    }

    const result = isValidAddress(invalidAddress, usePostalCode)

    expect(result.valid).toBe(false)
  })

  it('should focus on the next invalid field', () => {
    const invalidAddress = {
      ...address,
      postalCode: { value: '22231000' },
      city: { value: 'Rio de Janeiro' },
      street: { value: '' },
    }

    const result = isValidAddress(invalidAddress, usePostalCode)

    expect(result.address.street?.focus).toBe(true)
  })

  it('should tell if an address is valid', () => {
    const invalidAddress = {
      ...address,
      postalCode: { value: '22231000' },
      city: { value: 'Rio de Janeiro' },
      street: { value: 'Praia de Botafogo' },
      number: { value: '300' },
      neighborhood: { value: 'Botafogo' },
      state: { value: 'RJ' },
      receiverName: { value: 'Linus' },
    }

    const result = isValidAddress(invalidAddress, usePostalCode)

    expect(result.valid).toBe(true)
  })

  it("should consider valid even if options don't match", () => {
    const validAddress: AddressWithValidation = {
      country: { value: 'BRA' },
      addressQuery: { value: '' },
      addressId: { value: '172ba60df8b9019cd' },
      addressType: { value: 'residential' },
      postalCode: { value: '010011' },
      city: { value: 'João Pessoa' },
      street: { value: 'Av. Epitácio Pessoa' },
      number: { value: '1834' },
      neighborhood: { value: 'Expedicionários' },
      state: { value: 'PB' },
      receiverName: { value: 'Geraldo' },
      complement: { value: '' },
      reference: { value: '' },
      geoCoordinates: { value: [0, 0] },
      isDisposable: { value: true },
    }

    const myRules: PostalCodeRules = {
      country: 'BRA',
      abbr: 'BR',
      postalCodeFrom: TWO_LEVELS,
      postalCodeLevels: ['state', 'city'],
      fields: [
        {
          name: 'postalCode',
          label: 'postalCode',
        },
        {
          name: 'state',
          label: 'state',
          options: ['RJ', 'SP'],
          level: 1,
        },
        {
          name: 'city',
          label: 'city',
          optionsMap: {
            RJ: ['Rio de Janeiro'],
            SP: ['São Paulo'],
          },
          level: 2,
          basedOn: 'state',
        },
      ],
    }

    const { address: validatedAddress, valid } = isValidAddress(
      validAddress,
      myRules
    )

    expect(valid).toBe(true)
    expect(validatedAddress).toStrictEqual(
      expect.objectContaining({
        state: expect.objectContaining({
          valid: true,
        }),
        city: expect.objectContaining({
          valid: true,
        }),
      })
    )
  })

  it('should consider null or undefined values as empty', () => {
    const invalidAddress: AddressWithValidation = {
      country: { value: 'BRA' },
      addressQuery: { value: '' },
      addressId: { value: '172ba60df8b9019cd' },
      addressType: { value: 'residential' },
      postalCode: { value: '010011' },
      city: { value: null },
      street: { value: 'Av. Epitácio Pessoa' },
      number: { value: '1834' },
      neighborhood: { value: 'Expedicionários' },
      state: { value: 'PB' },
      receiverName: { value: 'Geraldo' },
      complement: { value: '' },
      reference: { value: '' },
      geoCoordinates: { value: [0, 0] },
      isDisposable: { value: true },
    }

    const myRules: PostalCodeRules = {
      country: 'BRA',
      abbr: 'BR',
      postalCodeFrom: TWO_LEVELS,
      postalCodeLevels: ['state', 'city'],
      fields: [
        {
          name: 'postalCode',
          label: 'postalCode',
        },
        {
          name: 'state',
          label: 'state',
          options: ['RJ', 'SP'],
          level: 1,
        },
        {
          name: 'city',
          label: 'city',
          optionsMap: {
            RJ: ['Rio de Janeiro'],
            SP: ['São Paulo'],
          },
          level: 2,
          basedOn: 'state',
        },
      ],
    }

    const { address: validatedAddress, valid } = isValidAddress(
      invalidAddress,
      myRules
    )

    expect(valid).toBe(false)
    expect(validatedAddress).toStrictEqual(
      expect.objectContaining({
        city: expect.objectContaining({
          valid: false,
          reason: EEMPTY,
        }),
      })
    )
  })
})

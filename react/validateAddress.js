import reduce from 'lodash/reduce'
import find from 'lodash/find'

import { hasOptions, getField, getListOfOptions } from './selectors/fields'
import { addFocusToNextInvalidField } from './transforms/address'
import {
  EEMPTY,
  EADDRESSTYPE,
  ENOTOPTION,
  ECOUNTRY,
  EGEOCOORDS,
  EPOSTALCODE,
} from './constants.js'

export function isValidAddress(address, rules) {
  const validatedAddress = addFocusToNextInvalidField(address, rules)

  // When no invalid field is found, addFocusToNextInvalidField returns the
  // address as it came in, so a stale `valid: false` (e.g. a field that was
  // empty on blur and filled later) would still make the submit fail once.
  // Re-check the fields flagged as invalid against their current value.
  const currentValidation = reduce(
    validatedAddress,
    (memo, field, name) => {
      if (field.valid === false) {
        memo[name] = validateField(field.value, name, validatedAddress, rules)
      }

      return memo
    },
    {}
  )

  const hasInvalidField = find(
    currentValidation,
    (validation) => validation.valid === false
  )

  if (hasInvalidField) {
    return { valid: false, address: validatedAddress }
  }

  return {
    valid: true,
    address: reduce(
      validatedAddress,
      (memo, field, name) => {
        memo[name] = currentValidation[name]
          ? { ...field, ...currentValidation[name] }
          : field

        return memo
      },
      {}
    ),
  }
}

export function validateAddress(address, rules) {
  return reduce(
    address,
    (memo, { value, valueOptions }, name) => {
      memo[name] = {
        value,
        valueOptions,
        ...validateField(value, name, address, rules),
      }

      return memo
    },
    {}
  )
}

export function validateChangedFields(changedFields, address, rules) {
  const changeFieldsNames = Object.keys(changedFields)
  const visitedFields = reduce(
    changedFields,
    (acc, field, name) => (field.visited ? acc.concat([name]) : acc),
    []
  )

  const newAddress = {
    ...address,
    ...changedFields,
  }

  return reduce(
    changeFieldsNames,
    (resultAddress, fieldName) => {
      const validationResult = validateField(
        resultAddress[fieldName].value,
        fieldName,
        resultAddress,
        rules
      )

      const isVisited = visitedFields.indexOf(fieldName) !== -1

      const becameValid =
        (!address[fieldName] || address[fieldName].valid !== true) &&
        validationResult.valid === true

      const keptValid =
        address[fieldName] &&
        address[fieldName].valid === true &&
        validationResult.valid === true

      const becameInvalid =
        address[fieldName] &&
        address[fieldName].valid === true &&
        validationResult.valid === false

      const showValidationResult =
        isVisited || (!isVisited && (becameValid || becameInvalid || keptValid))

      resultAddress[fieldName] = {
        ...resultAddress[fieldName],
        ...(showValidationResult ? validationResult : {}),
      }

      return resultAddress
    },
    newAddress
  )
}

export function validateField(value, name, address, rules) {
  switch (name) {
    case 'addressId':
      return validateAddressId(value, name, address, rules)

    case 'addressType':
      return validateAddressType(value, name, address, rules)

    case 'country':
      return validateCountry(value, name, address, rules)

    case 'geoCoordinates':
      return validateGeoCoordinates(value, name, address, rules)

    case 'postalCode':
      return validatePostalCode(value, name, address, rules)

    case 'city':

    case 'complement':

    case 'neighborhood':

    case 'number':

    case 'receiverName':

    case 'reference':

    case 'state':

    case 'street':

    case 'addressQuery':

    case 'isDisposable':
      return defaultValidation(value, name, address, rules)

    default:
      console.warn(`Unexpected field ${name}`)
  }
}

const validResult = { valid: true, reason: undefined }
const invalidAddressType = { valid: false, reason: EADDRESSTYPE }
const emptyField = { valid: false, reason: EEMPTY }
const notAnOption = { valid: false, reason: ENOTOPTION }
const invalidCountry = { valid: false, reason: ECOUNTRY }
const invalidGeoCoords = { valid: false, reason: EGEOCOORDS }
const invalidPostalCode = { valid: false, reason: EPOSTALCODE }

function valueInOptions(value, options) {
  const normalizedValue = value.toLowerCase()
  const normalizedOptions = options.map((option) => option.toLowerCase())

  return normalizedOptions.indexOf(normalizedValue) !== -1
}

function valueInOptionsPairs(value, optionsPairs) {
  return (
    find(
      optionsPairs,
      (optionPair) => optionPair.value.toLowerCase() === value.toLowerCase()
    ) || false
  )
}

function valueInOptionsMap(value, field, address, rules) {
  const options = getListOfOptions(field, address, rules)

  return (
    options &&
    options.length > 0 &&
    (typeof options[0] === 'object'
      ? valueInOptionsPairs(value, options)
      : valueInOptions(value, options))
  )
}

function validateOptions(value, field, address, rules) {
  if (field.options) {
    return valueInOptions(value, field.options) ? validResult : notAnOption
  }

  if (field.optionsPairs) {
    return valueInOptionsPairs(value, field.optionsPairs)
      ? validResult
      : notAnOption
  }

  return valueInOptionsMap(value, field, address, rules)
    ? validResult
    : notAnOption
}

function defaultValidation(value, name, address, rules) {
  const field = getField(name, rules)

  if (field && !value && field.required) {
    return emptyField
  }

  if (field && value && hasOptions(field)) {
    return validateOptions(value, field, address, rules)
  }

  return validResult
}

function validateAddressId(value, name, address, rules) {
  return value ? validResult : emptyField
}

const validAddressTypes = [
  'residential',
  'inStore',
  'commercial',
  'giftRegistry',
]

function validateAddressType(value, name, address, rules) {
  return validAddressTypes.indexOf(value) !== -1
    ? validResult
    : invalidAddressType
}

function validateCountry(value, name, address, rules) {
  if (!value) {
    return emptyField
  }

  if (value.length !== 3) {
    return invalidCountry
  }

  return validResult
}

function validateGeoCoordinates(value, name, address, rules) {
  return value && (value.length === 0 || value.length === 2)
    ? validResult
    : invalidGeoCoords
}

function validatePostalCode(value, name, address, rules) {
  const field = getField(name, rules)

  if (!field) return validResult

  if (field.required && !value) return emptyField

  // we check if the value is truthy because
  // a not-required empty postal code should be valid
  if (field.regex && value) {
    const regExp = new RegExp(field.regex)

    if (regExp.test(value) === false) {
      return invalidPostalCode
    }
  }

  return validResult
}

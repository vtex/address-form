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
  const hasInvalidField = find(
    validatedAddress,
    (field) => field.valid === false
  )

  return {
    valid: !hasInvalidField,
    address: validatedAddress,
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

  // there is no necessity to validate what comes from google maps
  if (address[name]?.geolocationAutoCompleted) {
    return validResult
  }

  if (field && hasOptions(field)) {
    return validateOptions(value, field, address, rules)
  }

  return validResult
}

function validateAddressId(value) {
  return value ? validResult : emptyField
}

const validAddressTypes = [
  'residential',
  'inStore',
  'commercial',
  'giftRegistry',
]

function validateAddressType(value) {
  return validAddressTypes.indexOf(value) !== -1
    ? validResult
    : invalidAddressType
}

function validateCountry(value) {
  if (!value) {
    return emptyField
  }

  if (value.length !== 3) {
    return invalidCountry
  }

  return validResult
}

function validateGeoCoordinates(value) {
  return value && (value.length === 0 || value.length === 2)
    ? validResult
    : invalidGeoCoords
}

function validatePostalCode(value, name, _, rules) {
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

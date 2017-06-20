import reduce from 'lodash/reduce'
import find from 'lodash/find'
import { hasOptions, getField, getListOfOptions } from './selectors/fields'
import {
  EEMPTY,
  EADDRESSTYPE,
  ENOTOPTION,
  ECOUNTRY,
  EGEOCOORDS,
  EPOSTALCODE,
} from './constants.js'

export function validateAddress(address, rules) {
  return reduce(
    address,
    (memo, { value }, name) => {
      memo[name] = {
        value,
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
    (address, fieldName) => {
      const validationResult = validateField(
        newAddress[fieldName].value,
        fieldName,
        address,
        rules
      )

      const isVisited = visitedFields.indexOf(fieldName) !== -1

      address[fieldName] = {
        ...address[fieldName],
        ...(isVisited || validationResult.valid === true
          ? validationResult
          : {}),
      }
      return address
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
  return options.indexOf(value) !== -1
}

function valueInOptionsPairs(value, optionsPairs) {
  return find(optionsPairs, optionPair => optionPair.value === value) || false
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

  if (field && hasOptions(field)) {
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

  if (field && field.required && !value) {
    return emptyField
  }

  if (field && field.regex) {
    const regex = new RegExp(field.regex)

    return regex.test(value) ? validResult : invalidPostalCode
  }

  return validResult
}

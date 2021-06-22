/**
 * @typedef {import('./types/rules').AddressRules} AddressRules
 * @typedef {import('./types/rules').Rule} Rule
 * @typedef {import('./types/rules').PostalCodeFieldRule} PostalCodeFieldRule
 * @typedef {import('./types/address').Fields} Fields
 * @typedef {import('./types/address').AddressWithValidation} AddressWithValidation
 * @typedef {import('./types/address').Address} Address
 */
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
import { logGeolocationAddressMismatch } from './metrics'

/**
 * @argument address {AddressWithValidation}
 * @argument rules {AddressRules}
 *
 * @returns {{
 *   valid: boolean
 *   address: import('./types/address').AddressWithValidation
 * }}
 */
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

/**
 * @argument address {AddressWithValidation}
 * @argument rules {AddressRules}
 *
 * @returns {import('./types/address').AddressWithValidation}
 */
export function validateAddress(address, rules) {
  const validatedAddressEntries = Object.entries(address).map(
    ([name, { value, valueOptions, geolocationAutoCompleted }]) => {
      return [
        name,
        {
          value,
          valueOptions,
          geolocationAutoCompleted,
          ...validateField(value, /** @type {Fields} */ (name), address, rules),
        },
      ]
    }
  )

  return Object.fromEntries(validatedAddressEntries)
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

/**
 * @template {Fields} FieldName
 * @argument value {Address[FieldName]}
 * @argument name {FieldName}
 * @argument address {AddressWithValidation}
 * @argument rules {AddressRules}
 *
 * @returns {ValidationResult}
 */
export function validateField(value, name, address, rules) {
  switch (name) {
    case 'addressId':
      return validateAddressId(/** @type {Address['addressId']} */ (value))

    case 'addressType':
      return validateAddressType(/** @type {Address['addressType']} */ (value))

    case 'country':
      return validateCountry(/** @type {Address['country']} */ (value))

    case 'geoCoordinates':
      return validateGeoCoordinates(
        /** @type {Address['geoCoordinates']} */ (value)
      )

    case 'postalCode':
      return validatePostalCode(
        /** @type {Address['postalCode']} */ (value),
        rules
      )

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

    default: {
      console.warn(`Unexpected field ${name}`)

      return validResult
    }
  }
}

/**
 * @typedef {{ valid: boolean; reason?: string }} ValidationResult
 */

/** @type {ValidationResult} */
const validResult = { valid: true, reason: undefined }
/** @type {ValidationResult} */
const invalidAddressType = { valid: false, reason: EADDRESSTYPE }
/** @type {ValidationResult} */
const emptyField = { valid: false, reason: EEMPTY }
/** @type {ValidationResult} */
const notAnOption = { valid: false, reason: ENOTOPTION }
/** @type {ValidationResult} */
const invalidCountry = { valid: false, reason: ECOUNTRY }
/** @type {ValidationResult} */
const invalidGeoCoords = { valid: false, reason: EGEOCOORDS }
/** @type {ValidationResult} */
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

/**
 * @template {Fields} FieldName
 * @argument value {Address[FieldName]}
 * @argument field {PostalCodeFieldRule}
 * @argument address {AddressWithValidation}
 * @argument rules {AddressRules}
 */
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

/**
 * @template {Fields} FieldName
 * @argument value {Address[FieldName]}
 * @argument name {FieldName}
 * @argument address {AddressWithValidation}
 * @argument rules {AddressRules}
 *
 * @returns {ValidationResult}
 */
function defaultValidation(value, name, address, rules) {
  const field = getField(name, rules)

  if (field && !value && field.required) {
    return emptyField
  }

  if (field && hasOptions(field)) {
    const result = validateOptions(
      value,
      /** @type {PostalCodeFieldRule} */ (field),
      address,
      rules
    )

    if (result === notAnOption && address[name]?.geolocationAutoCompleted) {
      logIfGeolocationAddressMismatchExists(value, name, address, rules)
    }

    return result
  }

  return validResult
}

/**
 * @argument value {string}
 *
 * @returns {ValidationResult}
 */
function validateAddressId(value) {
  return value ? validResult : emptyField
}

const validAddressTypes = [
  'residential',
  'inStore',
  'commercial',
  'giftRegistry',
]

/**
 * @argument value {string}
 *
 * @returns {ValidationResult}
 */
function validateAddressType(value) {
  return validAddressTypes.indexOf(value) !== -1
    ? validResult
    : invalidAddressType
}

/**
 * @argument value {string | undefined}
 */
function validateCountry(value) {
  if (!value) {
    return emptyField
  }

  if (value.length !== 3) {
    return invalidCountry
  }

  return validResult
}

/**
 * @argument value {number[] | undefined}
 *
 * @returns {ValidationResult}
 */
function validateGeoCoordinates(value) {
  return value && (value.length === 0 || value.length === 2)
    ? validResult
    : invalidGeoCoords
}

/**
 * @argument value {string | undefined}
 * @argument rules {AddressRules}
 *
 * @returns {ValidationResult}
 */
function validatePostalCode(value, rules) {
  const field = getField('postalCode', rules)

  if (!field) return validResult

  if (field.required && !value) return emptyField

  // we check if the value is truthy because
  // a not-required empty postal code should be valid
  if ('regex' in field && field.regex && value) {
    const regExp = new RegExp(field.regex)

    if (regExp.test(value) === false) {
      return invalidPostalCode
    }
  }

  return validResult
}

/**
 * To explain why this log is necessary, let's suppose that a customer searches
 * for the address "ATC, Sta Fe 581, S2000 Rosario, Santa Fe, Argentina". Google
 * Maps will correctly return "Santa Fe" as a state, but we only have "Santa Fé"
 * (with the accent) on `ARG.js`.
 *
 * This information should be logged as an address mismatch, so we can catch
 * this bug before our clients do.
 *
 * Although this works well for the state field, Google Maps would also return
 * "Rosario" as a city, which we do have properly mapped, but it would still log
 * as a mismatch since we can't find the city in `ARG.js` if we don't have the
 * state match.
 *
 * The function bellow also handles the above scenario, by checking if there was
 * a match in the immediate "superior" administrative area, which is the state
 * field for cities and the city field for neighborhoods.
 */
function logIfGeolocationAddressMismatchExists(value, name, address, rules) {
  if (name === 'city') {
    const stateField = getField('state', rules)
    const stateResult = validateOptions(
      address.state.value,
      stateField,
      address,
      rules
    )

    if (!stateResult.valid) {
      return
    }
  }

  if (name === 'neighborhood') {
    const cityField = getField('city', rules)
    const cityResult = validateOptions(
      address.city.value,
      cityField,
      address,
      rules
    )

    if (!cityResult.valid) {
      return
    }
  }

  logGeolocationAddressMismatch({
    fieldValue: value,
    fieldName: name,
    countryFromRules: rules.country,
    address,
  })
}

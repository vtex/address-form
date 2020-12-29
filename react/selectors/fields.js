import find from 'lodash/find'
import map from 'lodash/map'
import filter from 'lodash/filter'
import reduce from 'lodash/reduce'
import last from 'lodash/last'

import { POSTAL_CODE, ONE_LEVEL, TWO_LEVELS, THREE_LEVELS } from '../constants'
import hasOption from './hasOption'
import cleanStr from './cleanStr'

export function getField(fieldName, rules) {
  return find(rules.fields, ({ name }) => name === fieldName)
}

export function hasOptions(field, address) {
  const hasValueOptions =
    address && address[field.name] && address[field.name].valueOptions

  return !!(
    field.options ||
    field.optionsPairs ||
    field.optionsMap ||
    hasValueOptions
  )
}

function getFieldValue(field) {
  return typeof field === 'object' ? field.value : field
}

export function normalizeOptions(options) {
  return reduce(
    options,
    (acc, option, key) => {
      acc[cleanStr(key)] = option

      return acc
    },
    {}
  )
}

function fixOptions(options, fieldOptions) {
  return reduce(
    options,
    (acc, option) => {
      const cleanOption = hasOption(option, fieldOptions)

      return cleanOption ? acc.concat(cleanOption) : acc
    },
    []
  )
}

export function getListOfOptions(field, address, rules) {
  // Has options provided by Postal Code
  const postalCodeOptions =
    address && address[field.name] && address[field.name].valueOptions

  if (postalCodeOptions) {
    if (field.options && !field.basedOn) {
      return map(fixOptions(postalCodeOptions, field.options), toValueAndLabel)
    }

    if (field.optionsMap && field.basedOn && field.level === 2) {
      return map(
        fixOptions(postalCodeOptions, getSecondLevelOptions(field, address)),
        toValueAndLabel
      )
    }

    if (field.optionsMap && field.basedOn && field.level === 3) {
      return map(
        fixOptions(
          postalCodeOptions,
          getThirdLevelOptions(field, address, rules)
        ),
        toValueAndLabel
      )
    }

    return map(address[field.name].valueOptions, toValueAndLabel)
  }

  if (field.options) {
    return map(field.options, toValueAndLabel)
  }

  if (field.optionsPairs) {
    return field.optionsPairs
  }

  if (field.optionsMap && field.basedOn && field.level === 2) {
    return map(getSecondLevelOptions(field, address), toValueAndLabel)
  }

  if (field.optionsMap && field.basedOn && field.level === 3) {
    return map(getThirdLevelOptions(field, address, rules), toValueAndLabel)
  }

  if (process.env.NODE_ENV !== 'production') {
    throw new Error('Invalid rule set')
  } else {
    return []
  }
}

function getSecondLevelOptions(field, address) {
  const basedOn = getFieldValue(address[field.basedOn])
  const cleanBasedOn = cleanStr(basedOn)
  const normalizedOptionsMap = normalizeOptions(field.optionsMap)

  if (cleanBasedOn && normalizedOptionsMap[cleanBasedOn]) {
    return normalizedOptionsMap[cleanBasedOn]
  }

  return []
}

function getThirdLevelOptions(field, address, rules) {
  const secondLevelField = getField(field.basedOn, rules)
  const firstLevelField = getField(secondLevelField.basedOn, rules)

  const secondLevelValue = getFieldValue(address[secondLevelField.name])
  const firstLevelValue = getFieldValue(address[firstLevelField.name])

  const normalizedOptionsMap = normalizeOptions(field.optionsMap)
  const cleanFirstLevelValue = cleanStr(firstLevelValue)

  if (
    cleanFirstLevelValue &&
    secondLevelValue &&
    normalizedOptionsMap[cleanFirstLevelValue] &&
    normalizedOptionsMap[cleanFirstLevelValue][secondLevelValue]
  ) {
    return normalizedOptionsMap[cleanFirstLevelValue][secondLevelValue]
  }

  return []
}

function toValueAndLabel(option) {
  return { value: option, label: option }
}

export function getDependentFields(fieldName, rules) {
  let dependentFields = []

  if (fieldAffectsPostalCode(fieldName, rules)) {
    dependentFields = [...dependentFields, 'postalCode']
  }

  const dependentField = getFieldBasedOn(fieldName, rules)

  if (dependentField) {
    dependentFields = [...dependentFields, dependentField]

    const secondLevelField = getFieldBasedOn(dependentField, rules)

    if (secondLevelField) {
      dependentFields = [...dependentFields, secondLevelField]
    }
  }

  return dependentFields
}

function getFieldBasedOn(fieldName, rules) {
  const field = find(rules.fields, ({ basedOn }) => basedOn === fieldName)

  return field ? field.name : null
}

export function filterPostalCodeFields(rules) {
  switch (rules.postalCodeFrom) {
    case THREE_LEVELS:
      return filter(
        rules.fields,
        ({ name }) => rules.postalCodeLevels.indexOf(name) === -1
      )

    case TWO_LEVELS:
      return filter(
        rules.fields,
        ({ name }) => rules.postalCodeLevels.indexOf(name) === -1
      )

    case ONE_LEVEL:
      return filter(
        rules.fields,
        ({ name }) => rules.postalCodeLevels[0] !== name
      )

    default:
    case POSTAL_CODE:
      return filter(rules.fields, ({ name }) => name !== 'postalCode')
  }
}

function fieldAffectsPostalCode(fieldName, rules) {
  return (
    rules.postalCodeLevels && rules.postalCodeLevels.indexOf(fieldName) !== -1
  )
}

export function isDefiningPostalCodeField(fieldName, rules) {
  const lastLevelField = last(rules.postalCodeLevels)

  return fieldName === lastLevelField
}

export function filterAutoCompletedFields(rules, address) {
  return reduce(
    rules.fields,
    (fields, field) => {
      const addressField = address[field.name]

      if (
        addressField &&
        !addressField.valueOptions &&
        (addressField.postalCodeAutoCompleted ||
          addressField.geolocationAutoCompleted)
      ) {
        return fields
      }

      return fields.concat(field)
    },
    []
  )
}

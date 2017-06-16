import find from 'lodash/find'
import map from 'lodash/map'
import { POSTAL_CODE } from '../constants'

export function getField(fieldName, rules) {
  return find(rules.fields, ({ name }) => name === fieldName)
}

export function hasOptions(field) {
  return !!(field.options || field.optionsPairs || field.optionsMap)
}

export function getListOfOptions(field, address, rules) {
  if (field.options) {
    return map(field.options, toValueAndLabel)
  }

  if (field.optionsPairs) {
    return field.optionsPairs
  }

  if (field.optionsMap && field.basedOn && field.level === 2) {
    if (address[field.basedOn] && field.optionsMap[address[field.basedOn]]) {
      const options = field.optionsMap[address[field.basedOn]]
      return map(options, toValueAndLabel)
    }

    return []
  }

  if (field.optionsMap && field.basedOn && field.level === 3) {
    const secondLevelField = getField(field.basedOn, rules)
    const firstLevelField = getField(secondLevelField.basedOn, rules)

    if (
      address[firstLevelField.name] &&
      address[secondLevelField.name] &&
      field.optionsMap[address[firstLevelField.name]][
        address[secondLevelField.name]
      ]
    ) {
      const options =
        field.optionsMap[address[firstLevelField.name]][
          address[secondLevelField.name]
        ]
      return map(options, toValueAndLabel)
    }

    return []
  }

  if (process.env.NODE_ENV !== 'production') {
    throw new Error('Invalid rule set')
  } else {
    return []
  }
}

function toValueAndLabel(option) {
  return { value: option, label: option }
}

export function getDependentFields(fieldName, rules) {
  let dependentFields = []

  if (rules.postalCodeFrom !== POSTAL_CODE) {
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

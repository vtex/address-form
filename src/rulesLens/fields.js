import find from 'lodash/find'
import map from 'lodash/map'

export function getField(fieldName, rules) {
  return find(rules.fields, ({ name }) => name === fieldName)
}

export function hasOptions(field) {
  return field.options || field.optionsPairs || field.optionsMap
}

function toValueAndLabel(option) {
  return { value: option, label: option }
}

export function getListOfOptions(field, address, rules) {
  if (field.options) {
    return map(field.options, toValueAndLabel)
  }

  if (field.optionsPairs) {
    return field.optionsPairs
  }

  if (field.optionsMap && field.basedOn && field.level === 2) {
    const fieldBasedOn = getField(field.basedOn, rules)

    if (
      address[fieldBasedOn.name] && field.optionsMap[address[fieldBasedOn.name]]
    ) {
      const options = field.optionsMap[address[fieldBasedOn.name]]
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

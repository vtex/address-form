import find from 'lodash/find'
import map from 'lodash/map'
import filter from 'lodash/filter'
import reduce from 'lodash/reduce'
import last from 'lodash/last'

import { POSTAL_CODE, ONE_LEVEL, TWO_LEVELS, THREE_LEVELS } from '../constants'
import hasOption from './hasOption'
import cleanStr from './cleanStr'
import type {
  PostalCodeFieldRule,
  Rule,
  Rules,
  PostalCodeRules,
  GeolocationRule,
} from '../types/rules'
import type {
  Fields,
  AddressWithValidation,
  ValidatedField,
  AddressValues,
  Address,
} from '../types/address'
import type {
  getThreeLevels,
  getTwoLevels,
} from '../transforms/addressFieldsOptions'

function isGeolocationRule(rule: Rule): rule is GeolocationRule {
  return !('name' in rule)
}

export function getField(fieldName: Fields, rules: Rules) {
  if ('fields' in rules) {
    return rules.fields.find((field) => field.name === fieldName)
  }

  return rules[fieldName]
}

export function getFieldLabel(field: PostalCodeFieldRule) {
  if ('label' in field) {
    return field.label
  }

  return field.fixedLabel
}

export function hasOptions(
  field: Rule,
  address?: AddressWithValidation
): field is PostalCodeFieldRule {
  // geolocation rules does not contain options
  if (isGeolocationRule(field)) {
    return false
  }

  const hasValueOptions = !!address?.[field.name]?.valueOptions

  return !!(
    field.options ||
    field.optionsPairs ||
    field.optionsMap ||
    hasValueOptions
  )
}

function getFieldValue<Field extends Fields>(
  field: ValidatedField<Address[Field]> | AddressValues
) {
  if (field == null) {
    return undefined
  }

  return typeof field === 'object' && !Array.isArray(field)
    ? field.value
    : field
}

export function normalizeOptions<T = string>(
  options: Record<string, T>
): Record<string, T> {
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

export function getListOfOptions(
  field: PostalCodeFieldRule,
  address: AddressWithValidation,
  rules: PostalCodeRules
) {
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

function getSecondLevelOptions(
  field: PostalCodeFieldRule,
  address: Address | AddressWithValidation
) {
  const basedOn = getFieldValue(address[field.basedOn!]) as string
  const cleanBasedOn = cleanStr(basedOn)
  const normalizedOptionsMap = normalizeOptions(
    field.optionsMap as ReturnType<typeof getTwoLevels>
  )

  if (cleanBasedOn && normalizedOptionsMap[cleanBasedOn]) {
    return normalizedOptionsMap[cleanBasedOn]
  }

  return []
}

function getThirdLevelOptions(
  field: PostalCodeFieldRule,
  address: AddressWithValidation,
  rules: PostalCodeRules
) {
  const secondLevelField = getField(
    field.basedOn!,
    rules
  ) as PostalCodeFieldRule

  if (!secondLevelField) {
    return []
  }

  const firstLevelField = getField(
    secondLevelField.basedOn!,
    rules
  ) as PostalCodeFieldRule

  if (!firstLevelField) {
    return []
  }

  const secondLevelValue = getFieldValue(
    address[secondLevelField.name]
  ) as string

  const firstLevelValue = getFieldValue(address[firstLevelField.name]) as string

  const normalizedOptionsMap = normalizeOptions(
    field.optionsMap as ReturnType<typeof getThreeLevels>
  )

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

function toValueAndLabel(option: string) {
  return { value: option, label: option }
}

export function getDependentFields(fieldName: Fields, rules: Rules) {
  let dependentFields: Fields[] = []

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

export function filterAutoCompletedFields(
  rules: PostalCodeRules,
  address: AddressWithValidation
) {
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
    [] as PostalCodeFieldRule[]
  )
}

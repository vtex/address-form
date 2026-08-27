import last from 'lodash/last'

import { ONE_LEVEL, TWO_LEVELS, THREE_LEVELS } from '../constants'
import { getField, normalizeOptions, findOptionsMapKey } from './fields'
import cleanStr from './cleanStr'

export function getPostalCodeOptions(address, rules) {
  switch (rules.postalCodeFrom) {
    case ONE_LEVEL:
      return getOneLevelPostalCodes(address, rules)

    case TWO_LEVELS:
      return getTwoLevelsPostalCodes(address, rules)

    default:
    case THREE_LEVELS:
      return getThreeLevelsPostalCodes(address, rules)
  }
}

function getOneLevelPostalCodes(address, rules) {
  return rules.firstLevelPostalCodes
}

function getTwoLevelsPostalCodes(address, rules) {
  const firstLevel = getField(rules.postalCodeLevels[0], rules)
  const firstLevelValue = cleanStr(address[firstLevel.name].value)
  const normalizedSecondLevelPostalCodes = normalizeOptions(
    rules.secondLevelPostalCodes
  )

  return address[firstLevel.name] &&
    address[firstLevel.name].value &&
    normalizedSecondLevelPostalCodes[firstLevelValue]
    ? normalizedSecondLevelPostalCodes[firstLevelValue]
    : []
}

function getThreeLevelsPostalCodes(address, rules) {
  const firstLevel = getField(rules.postalCodeLevels[0], rules)
  const secondLevel = getField(rules.postalCodeLevels[1], rules)

  const firstLevelValue = cleanStr(address[firstLevel.name].value)
  const secondLevelValue = address[secondLevel.name]?.value
  const normalizedThirdLevelPostalCodes = normalizeOptions(
    rules.thirdLevelPostalCodes
  )

  if (
    !address[firstLevel.name]?.value ||
    !firstLevelValue ||
    !secondLevelValue
  ) {
    return []
  }

  const postalCodes = findOptionsMapKey(
    normalizedThirdLevelPostalCodes[firstLevelValue],
    secondLevelValue
  )

  return postalCodes || []
}

export function getResolvedPostalCodeFieldLabel(fieldName, address, rules) {
  const fieldValue = address[fieldName]?.value
  const postalCodeValue = address.postalCode?.value

  if (!fieldValue || !postalCodeValue) {
    return null
  }

  const matchingOption = getPostalCodeOptions(address, rules).find(
    (option) =>
      cleanStr(option.label) === cleanStr(fieldValue) &&
      option.postalCode === postalCodeValue
  )

  return matchingOption ? matchingOption.label : fieldValue
}

export function getLastLevelField(rules) {
  switch (rules.postalCodeFrom) {
    case ONE_LEVEL:

    case TWO_LEVELS:

    case THREE_LEVELS:
      return getField(last(rules.postalCodeLevels), rules)

    default:
      throw new Error(`Unknown postalCodeFrom value: ${rules.postalCodeFrom}`)
  }
}

export function getLevelField(level, rules) {
  return getField(rules.postalCodeLevels[level], rules)
}

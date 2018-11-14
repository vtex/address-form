import { ONE_LEVEL, TWO_LEVELS, THREE_LEVELS } from '../constants'
import { getField } from './fields'
import last from 'lodash/last'

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

  return address[firstLevel.name] &&
  address[firstLevel.name].value &&
  rules.secondLevelPostalCodes[address[firstLevel.name].value]
    ? rules.secondLevelPostalCodes[address[firstLevel.name].value]
    : []
}

function getThreeLevelsPostalCodes(address, rules) {
  const firstLevel = getField(rules.postalCodeLevels[0], rules)
  const secondLevel = getField(rules.postalCodeLevels[1], rules)

  return address[firstLevel.name] &&
  address[firstLevel.name].value &&
  address[secondLevel.name] &&
  address[secondLevel.name].value &&
  rules.thirdLevelPostalCodes[address[firstLevel.name].value] &&
  rules.thirdLevelPostalCodes[address[firstLevel.name].value][
    address[secondLevel.name].value
  ]
    ? rules.thirdLevelPostalCodes[address[firstLevel.name].value][
        address[secondLevel.name].value
      ]
    : []
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

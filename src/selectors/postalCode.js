import { ONE_LEVEL, TWO_LEVELS, THREE_LEVELS } from '../constants'
import { getField } from './fields'
import find from 'lodash/find'

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

export function getLevels(rules) {
  let firstLevel, secondLevel, thirdLevel

  if (rules.postalCodeLevel || rules.postalCodeLevels.length >= 1) {
    firstLevel = find(
      rules.fields,
      ({ name }) =>
        name === (rules.postalCodeLevel || rules.postalCodeLevels[0])
    )
  }

  if (rules.postalCodeLevels && rules.postalCodeLevels.length >= 2) {
    secondLevel = find(
      rules.fields,
      ({ name }) => name === rules.postalCodeLevels[1]
    )
  }

  if (rules.postalCodeLevels && rules.postalCodeLevels.length >= 3) {
    thirdLevel = find(
      rules.fields,
      ({ name }) => name === rules.postalCodeLevels[2]
    )
  }

  return {
    levels: [firstLevel, secondLevel, thirdLevel],
  }
}

export function getCurrentLevelField(levels, rules) {
  switch (rules.postalCodeFrom) {
    case ONE_LEVEL:
      return levels[0]
    case TWO_LEVELS:
      return levels[1]
    case THREE_LEVELS:
      return levels[2]
    default:
      throw new Error(`Unknown postalCodeFrom value: ${rules.postalCodeFrom}`)
  }
}

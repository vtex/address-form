import map from 'lodash/map'
import reduce from 'lodash/reduce'
import values from 'lodash/values'

import type {
  OneLevelData,
  TwoLevelsData,
  ThreeLevelsData,
} from './addressFieldsOptions'

export function firstLevelPostalCodes(countryData: OneLevelData) {
  return map(countryData, (secondLevel, label) => ({
    label,
    postalCode: values(secondLevel)[0],
  }))
}

export function secondLevelPostalCodes(countryData: TwoLevelsData) {
  return reduce(
    countryData,
    (memo, secondLevels, firstLevel) => {
      memo[firstLevel] = map(secondLevels, (postalCode, label) => ({
        postalCode,
        label,
      }))

      return memo
    },
    {}
  )
}

export function thirdLevelPostalCodes(countryData: ThreeLevelsData) {
  return reduce(
    countryData,
    (memo, secondLevels, firstLevel) => {
      memo[firstLevel] = reduce(
        secondLevels,
        (memoSecond, thirdLevels, secondLevel) => {
          memoSecond[secondLevel] = map(thirdLevels, (postalCode, label) => ({
            postalCode,
            label,
          }))

          return memoSecond
        },
        {}
      )

      return memo
    },
    {}
  )
}

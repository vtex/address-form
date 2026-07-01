import map from 'lodash/map'
import reduce from 'lodash/reduce'
import values from 'lodash/values'

import type {
  OneLevelData,
  TwoLevelsData,
  ThreeLevelsData,
} from './addressFieldsOptions'

export type PostalCodeOption = {
  label: string
  postalCode: string
}

export type FirstLevelPostalCodesList = PostalCodeOption[]

export type SecondLevelPostalCodesMap = Record<string, PostalCodeOption[]>

export type ThirdLevelPostalCodesMap = Record<
  string,
  Record<string, PostalCodeOption[]>
>

export function firstLevelPostalCodes(
  countryData: OneLevelData
): FirstLevelPostalCodesList {
  return map(countryData, (secondLevel, label) => ({
    label,
    postalCode: String(values(secondLevel)[0]),
  }))
}

export function secondLevelPostalCodes(
  countryData: TwoLevelsData
): SecondLevelPostalCodesMap {
  return reduce(
    countryData,
    (memo: SecondLevelPostalCodesMap, secondLevels, firstLevel) => {
      memo[firstLevel] = map(secondLevels, (postalCode, label) => ({
        postalCode: String(postalCode),
        label,
      }))

      return memo
    },
    {} as SecondLevelPostalCodesMap
  )
}

export function thirdLevelPostalCodes(
  countryData: ThreeLevelsData
): ThirdLevelPostalCodesMap {
  return reduce(
    countryData,
    (memo: ThirdLevelPostalCodesMap, secondLevels, firstLevel) => {
      memo[firstLevel] = reduce(
        secondLevels,
        (memoSecond, thirdLevels, secondLevel) => {
          memoSecond[secondLevel] = map(thirdLevels, (postalCode, label) => ({
            postalCode: String(postalCode),
            label,
          }))

          return memoSecond
        },
        {} as Record<string, PostalCodeOption[]>
      )

      return memo
    },
    {} as ThirdLevelPostalCodesMap
  )
}

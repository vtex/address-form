import map from 'lodash/map'
import reduce from 'lodash/reduce'
import values from 'lodash/values'

export function firstLevelPostalCodes(countryData) {
  return map(countryData, (secondLevel, firstLevelName) => ({
    firstLevelName,
    postalCode: values(secondLevel)[0],
  }))
}

export function secondLevelPostalCodes(countryData) {
  return reduce(
    countryData,
    (memo, secondLevels, firstLevel) => {
      memo[firstLevel] = map(secondLevels, (postalCode, secondLevelName) => ({
        postalCode,
        secondLevelName,
      }))
      return memo
    },
    {}
  )
}

export function thirdLevelPostalCodes(countryData) {
  return reduce(
    countryData,
    (memo, secondLevels, firstLevel) => {
      memo[firstLevel] = reduce(
        secondLevels,
        (memoSecond, thirdLevels, secondLevel) => {
          memoSecond[
            secondLevel
          ] = map(thirdLevels, (postalCode, thirdLevelName) => ({
            postalCode,
            thirdLevelName,
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

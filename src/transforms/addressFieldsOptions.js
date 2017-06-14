import keys from 'lodash/keys'
import map from 'lodash/map'
import reduce from 'lodash/reduce'

export function getFirstLevel(countryData) {
  return keys(countryData)
}

export function getSecondLevel(countryData) {
  return reduce(
    countryData,
    (memo, secondLevels, firstLevelName) => {
      memo[firstLevelName] = keys(secondLevels)
      return memo
    },
    {}
  )
}

export function getThirdLevel(countryData) {
  return reduce(
    countryData,
    (memoFirst, secondLevels, firstLevelName) => {
      memoFirst[firstLevelName] = reduce(
        secondLevels,
        (memoSecond, thirdLevels, secondLevelName) => {
          memoSecond[secondLevelName] = map(
            thirdLevels,
            (postalCode, thirdLevelName) => thirdLevelName
          )
          return memoSecond
        },
        {}
      )
      return memoFirst
    },
    {}
  )
}

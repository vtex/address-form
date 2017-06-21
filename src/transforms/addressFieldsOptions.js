export function getOneLevel(countryData) {
  return Object.keys(countryData)
}

export function getTwoLevels(countryData) {
  return Object.keys(countryData).reduce((result, child) => {
    result[child] = getOneLevel(countryData[child])
    return result
  }, {})
}

export function getThreeLevels(countryData) {
  return Object.keys(countryData).reduce((result, child) => {
    result[child] = getTwoLevels(countryData[child])
    return result
  }, {})
}

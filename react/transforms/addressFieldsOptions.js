export function getOneLevel(countryData) {
  return Object.keys(countryData)
}

export function getTwoLevels(countryData) {
  return Object.keys(countryData).reduce((result, child) => {
    const value = countryData[child]
    result[child] = Array.isArray(value) ? value : getOneLevel(value)
    return result
  }, {})
}

export function getThreeLevels(countryData) {
  return Object.keys(countryData).reduce((result, child) => {
    result[child] = getTwoLevels(countryData[child])
    return result
  }, {})
}

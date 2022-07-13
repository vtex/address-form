export type OneLevelData = Record<string, unknown>
export type TwoLevelsData = Record<string, string[] | OneLevelData>
export type ThreeLevelsData = Record<string, TwoLevelsData>

export function getOneLevel(countryData: OneLevelData): string[] {
  return Object.keys(countryData)
}

export function getTwoLevels(
  countryData: TwoLevelsData
): Record<string, string[]> {
  return Object.keys(countryData).reduce((result, child) => {
    const value = countryData[child]

    result[child] = Array.isArray(value) ? value : getOneLevel(value)

    return result
  }, {})
}

export function getThreeLevels(
  countryData: ThreeLevelsData
): Record<string, Record<string, string[]>> {
  return Object.keys(countryData).reduce((result, child) => {
    result[child] = getTwoLevels(countryData[child])

    return result
  }, {})
}

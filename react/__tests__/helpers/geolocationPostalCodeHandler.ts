import type { AddressWithValidation, FillableFields } from '../../types/address'
import type { PostalCodeRules } from '../../types/rules'

export type HierarchySample = {
  values: Partial<Record<FillableFields, string>>
  expectedPostal: string
}

export type AlternateHierarchySample = {
  first: HierarchySample
  second: HierarchySample
}

export function buildAddress(
  values: Partial<Record<FillableFields, string | null>>,
  emptyField?: FillableFields
): AddressWithValidation {
  const address = {} as AddressWithValidation

  Object.keys(values).forEach((field) => {
    const name = field as FillableFields
    const value = values[name]

    if (name === emptyField || value == null) {
      address[name] = {}

      return
    }

    address[name] = { value }
  })

  return address
}

export function getHierarchySample(
  rules: PostalCodeRules
): HierarchySample | null {
  const levels = rules.postalCodeLevels

  if (!levels?.length) {
    return null
  }

  if (rules.thirdLevelPostalCodes) {
    const [firstLevel, secondLevels] =
      Object.entries(rules.thirdLevelPostalCodes)[0] ?? []

    if (!firstLevel || !secondLevels) {
      return null
    }

    const [secondLevel, entries] = Object.entries(secondLevels)[0] ?? []
    const entry = entries?.[0]

    if (!secondLevel || !entry) {
      return null
    }

    return {
      values: {
        [levels[0]]: firstLevel,
        [levels[1]]: secondLevel,
        [levels[2]]: entry.label,
      },
      expectedPostal: entry.postalCode,
    }
  }

  if (rules.secondLevelPostalCodes) {
    const [firstLevel, entries] =
      Object.entries(rules.secondLevelPostalCodes)[0] ?? []
    const entry = entries?.[0]

    if (!firstLevel || !entry || levels.length !== 2) {
      return null
    }

    return {
      values: {
        [levels[0]]: firstLevel,
        [levels[1]]: entry.label,
      },
      expectedPostal: entry.postalCode,
    }
  }

  return null
}

export function getAlternateHierarchySample(
  rules: PostalCodeRules
): AlternateHierarchySample | null {
  const levels = rules.postalCodeLevels

  if (!rules.thirdLevelPostalCodes || !levels || levels.length !== 3) {
    return null
  }

  const [firstLevel, secondLevels] =
    Object.entries(rules.thirdLevelPostalCodes)[0] ?? []

  if (!firstLevel || !secondLevels) {
    return null
  }

  const provinceEntries = Object.entries(secondLevels)

  const toSample = (province: string, entry: { label: string; postalCode: string }) => ({
    values: {
      [levels[0]]: firstLevel,
      [levels[1]]: province,
      [levels[2]]: entry.label,
    },
    expectedPostal: entry.postalCode,
  })

  for (let p = 0; p < provinceEntries.length; p++) {
    for (let q = p + 1; q < provinceEntries.length; q++) {
      const [firstProvince, firstEntries] = provinceEntries[p]
      const [secondProvince, secondEntries] = provinceEntries[q]

      for (const firstEntry of firstEntries) {
        for (const secondEntry of secondEntries) {
          if (firstEntry.postalCode !== secondEntry.postalCode) {
            return {
              first: toSample(firstProvince, firstEntry),
              second: toSample(secondProvince, secondEntry),
            }
          }
        }
      }
    }
  }

  const candidates: Array<{
    province: string
    entry: { label: string; postalCode: string }
  }> = []

  for (const [province, entries] of provinceEntries) {
    for (const entry of entries) {
      candidates.push({ province, entry })
    }
  }

  for (let i = 0; i < candidates.length; i++) {
    for (let j = i + 1; j < candidates.length; j++) {
      const first = candidates[i]
      const second = candidates[j]

      if (first.entry.postalCode !== second.entry.postalCode) {
        return {
          first: toSample(first.province, first.entry),
          second: toSample(second.province, second.entry),
        }
      }
    }
  }

  return null
}

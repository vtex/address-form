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

  if (provinceEntries.length < 2) {
    return null
  }

  const [firstProvince, firstEntries] = provinceEntries[0]
  const [secondProvince, secondEntries] = provinceEntries[1]
  const firstEntry = firstEntries[0]
  const secondEntry = secondEntries[0]

  if (!firstEntry || !secondEntry) {
    return null
  }

  return {
    first: {
      values: {
        [levels[0]]: firstLevel,
        [levels[1]]: firstProvince,
        [levels[2]]: firstEntry.label,
      },
      expectedPostal: firstEntry.postalCode,
    },
    second: {
      values: {
        [levels[0]]: firstLevel,
        [levels[1]]: secondProvince,
        [levels[2]]: secondEntry.label,
      },
      expectedPostal: secondEntry.postalCode,
    },
  }
}

export function hasHierarchyPostalHandler(rules: PostalCodeRules): boolean {
  return (
    typeof rules.geolocation?.postalCode?.handler === 'function' &&
    getHierarchySample(rules) !== null
  )
}

export function getCountriesWithHierarchyPostalHandler(
  countries: Record<string, PostalCodeRules>
): Array<[string, PostalCodeRules]> {
  return Object.entries(countries)
    .filter(([countryCode]) => countryCode !== 'defaultRules')
    .filter(([, rules]) => hasHierarchyPostalHandler(rules))
    .sort(([left], [right]) => left.localeCompare(right))
}

export function buildAddress(values, emptyField) {
  const address = {}

  Object.keys(values).forEach((field) => {
    const value = values[field]

    if (field === emptyField || value == null) {
      address[field] = {}

      return
    }

    address[field] = { value }
  })

  return address
}

export function getHierarchySample(rules) {
  const levels = rules.postalCodeLevels

  if (!levels || !levels.length) {
    return null
  }

  if (rules.thirdLevelPostalCodes) {
    const [firstLevel, secondLevels] =
      Object.entries(rules.thirdLevelPostalCodes)[0] || []

    if (!firstLevel || !secondLevels) {
      return null
    }

    const [secondLevel, entries] = Object.entries(secondLevels)[0] || []
    const entry = entries && entries[0]

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
      Object.entries(rules.secondLevelPostalCodes)[0] || []
    const entry = entries && entries[0]

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

export function getAlternateHierarchySample(rules) {
  const levels = rules.postalCodeLevels

  if (!rules.thirdLevelPostalCodes || !levels || levels.length !== 3) {
    return null
  }

  const [firstLevel, secondLevels] =
    Object.entries(rules.thirdLevelPostalCodes)[0] || []

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
    sharedField: levels[0],
    sharedValue: firstLevel,
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

export function resolvesPostalCodeFromHierarchy(rules) {
  const handler =
    rules.geolocation &&
    rules.geolocation.postalCode &&
    rules.geolocation.postalCode.handler
  const sample = getHierarchySample(rules)

  if (!handler || !sample) {
    return false
  }

  const result = handler(buildAddress(sample.values), {}, 0)

  return (
    result.postalCode &&
    result.postalCode.value === sample.expectedPostal
  )
}

export function getCountriesWithHierarchyPostalHandler(countries) {
  return Object.entries(countries)
    .filter(([countryCode]) => countryCode !== 'defaultRules')
    .filter(([, rules]) => resolvesPostalCodeFromHierarchy(rules))
    .sort(([left], [right]) => left.localeCompare(right))
}

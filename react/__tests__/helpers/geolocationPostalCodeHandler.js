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

  const toSample = (province, entry) => ({
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

      for (let i = 0; i < firstEntries.length; i++) {
        for (let j = 0; j < secondEntries.length; j++) {
          const firstEntry = firstEntries[i]
          const secondEntry = secondEntries[j]

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

  const candidates = []

  for (let p = 0; p < provinceEntries.length; p++) {
    const [province, entries] = provinceEntries[p]

    for (let i = 0; i < entries.length; i++) {
      candidates.push({ province, entry: entries[i] })
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

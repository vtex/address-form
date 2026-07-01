function getFieldValue(address, field) {
  const fieldValue = address[field]

  if (
    !fieldValue ||
    typeof fieldValue !== 'object' ||
    fieldValue.value == null ||
    fieldValue.value === ''
  ) {
    return undefined
  }

  return fieldValue.value
}

function lookupPostalCode(countryData, keys) {
  let current = countryData

  for (let i = 0; i < keys.length; i++) {
    if (current == null || typeof current !== 'object') {
      return undefined
    }

    current = current[keys[i]]
  }

  return typeof current === 'string' ? current : undefined
}

export function createPostalCodeFromHierarchyHandler(countryData, levels) {
  return (address) => {
    const keys = levels.map((level) => getFieldValue(address, level))

    if (keys.some((key) => !key)) {
      return address
    }

    const postalCode = lookupPostalCode(countryData, keys)

    if (!postalCode) {
      return address
    }

    return {
      ...address,
      postalCode: { value: postalCode },
    }
  }
}

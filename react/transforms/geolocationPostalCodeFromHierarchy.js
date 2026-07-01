import get from 'lodash/get'

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
  const result = get(countryData, keys)

  return typeof result === 'string' ? result : undefined
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

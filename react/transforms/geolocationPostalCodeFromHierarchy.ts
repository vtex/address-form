import type { AddressWithValidation, FillableFields } from '../types/address'
import type { GeolocationRule } from '../types/rules'

export type HierarchyCountryData = Record<string, unknown>

function getFieldValue(
  address: AddressWithValidation,
  field: FillableFields
): string | undefined {
  const fieldValue = address[field]

  if (
    !fieldValue ||
    typeof fieldValue !== 'object' ||
    !('value' in fieldValue)
  ) {
    return undefined
  }

  const { value } = fieldValue

  return typeof value === 'string' && value.length > 0 ? value : undefined
}

function lookupPostalCode(
  countryData: HierarchyCountryData,
  keys: string[]
): string | undefined {
  let current: unknown = countryData

  for (const key of keys) {
    if (current == null || typeof current !== 'object') {
      return undefined
    }

    current = (current as Record<string, unknown>)[key]
  }

  return typeof current === 'string' ? current : undefined
}

export function createPostalCodeFromHierarchyHandler(
  countryData: HierarchyCountryData,
  levels: FillableFields[]
): NonNullable<GeolocationRule['handler']> {
  return (address) => {
    const keys = levels.map((level) => getFieldValue(address, level))

    if (keys.some((key) => !key)) {
      return address
    }

    const postalCode = lookupPostalCode(countryData, keys as string[])

    if (!postalCode) {
      return address
    }

    return {
      ...address,
      postalCode: { value: postalCode },
    }
  }
}

import get from 'lodash/get'

import cleanStr from '../selectors/cleanStr'
import type { AddressWithValidation, FillableFields } from '../types/address'
import type { GeolocationRule } from '../types/rules'

export type HierarchyCountryData = Record<string, unknown>

export type HierarchyLookupOptions = {
  /**
   * Match hierarchy keys ignoring accents/case and Spanish admin prefixes
   * ("Provincia de …", "Departamento de …", etc.).
   */
  normalizeKeys?: boolean
  /**
   * When the path under the resolved first level misses, search other
   * first-level branches for the remaining levels (e.g. Callao attributed
   * to Lima). Prefer the resolved first level before scanning all.
   */
  crossFirstLevelFallback?: boolean
  /**
   * Write canonical `countryData` keys back onto the address level fields
   * when a match is found.
   */
  canonicalizeLevels?: boolean
}

/**
 * Google prefixes many LATAM admin names with the level, e.g.
 * "Provincia de Chincha", "Distrito de Lima",
 * "Provincia Constitucional del Callao", "Región de Antofagasta".
 */
export const stripGeoLevelPrefix = (name: string) =>
  name.replace(
    /^(provincia( constitucional)?|departamento|distrito|region|región) de(l)?\s+/i,
    ''
  )

export const normalizeGeoName = (name?: string | null) =>
  name ? cleanStr(stripGeoLevelPrefix(name)) : ''

/**
 * Finds the canonical key in a hierarchy node matching a Google-provided
 * name, optionally tolerating prefixes/accents/casing.
 */
export const findCountryDataKey = (
  data: Record<string, unknown>,
  name?: string | null,
  normalize = true
): string | undefined => {
  if (!name) {
    return undefined
  }

  if (data[name] !== undefined) {
    return name
  }

  if (!normalize) {
    return undefined
  }

  const normalizedName = normalizeGeoName(name)

  return Object.keys(data).find((key) => cleanStr(key) === normalizedName)
}

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

function lookupPostalCodeExact(
  countryData: HierarchyCountryData,
  keys: string[]
): string | undefined {
  const result = get(countryData, keys)

  return typeof result === 'string' ? result : undefined
}

type ResolvedPath = {
  keys: string[]
  postalCode: string
}

function resolveNormalizedPath(
  countryData: HierarchyCountryData,
  values: string[]
): ResolvedPath | undefined {
  let node: unknown = countryData
  const keys: string[] = []

  for (const value of values) {
    if (!node || typeof node !== 'object' || Array.isArray(node)) {
      return undefined
    }

    const key = findCountryDataKey(node as Record<string, unknown>, value, true)

    if (!key) {
      return undefined
    }

    keys.push(key)
    node = (node as Record<string, unknown>)[key]
  }

  return typeof node === 'string' ? { keys, postalCode: node } : undefined
}

/**
 * Search every first-level branch for a match on the remaining levels
 * (values.slice(1)). Used for cases like Callao nested under the wrong
 * department.
 */
function resolveCrossFirstLevelPath(
  countryData: HierarchyCountryData,
  values: string[],
  preferFirstKey?: string
): ResolvedPath | undefined {
  if (values.length < 2) {
    return undefined
  }

  const rest = values.slice(1)
  const firstKeys = Object.keys(countryData)
  const orderedKeys = preferFirstKey
    ? [preferFirstKey, ...firstKeys.filter((key) => key !== preferFirstKey)]
    : firstKeys

  for (const firstKey of orderedKeys) {
    const branch = countryData[firstKey]

    if (!branch || typeof branch !== 'object' || Array.isArray(branch)) {
      continue
    }

    const resolved = resolveNormalizedPath(branch as HierarchyCountryData, rest)

    if (resolved) {
      return {
        keys: [firstKey, ...resolved.keys],
        postalCode: resolved.postalCode,
      }
    }
  }

  return undefined
}

function resolveHierarchyPath(
  countryData: HierarchyCountryData,
  values: string[],
  options: HierarchyLookupOptions
): ResolvedPath | undefined {
  if (!options.normalizeKeys) {
    const postalCode = lookupPostalCodeExact(countryData, values)

    return postalCode ? { keys: values, postalCode } : undefined
  }

  const direct = resolveNormalizedPath(countryData, values)

  if (direct) {
    return direct
  }

  if (!options.crossFirstLevelFallback) {
    return undefined
  }

  // Prefer the first-level key that normalize would pick from values[0],
  // then scan the rest of the tree.
  const preferredFirst = findCountryDataKey(countryData, values[0], true)

  return resolveCrossFirstLevelPath(countryData, values, preferredFirst)
}

export function createPostalCodeFromHierarchyHandler(
  countryData: HierarchyCountryData,
  levels: FillableFields[],
  options: HierarchyLookupOptions = {}
): NonNullable<GeolocationRule['handler']> {
  return (address) => {
    const values = levels.map((level) => getFieldValue(address, level))

    if (values.some((value) => !value)) {
      return address
    }

    const resolved = resolveHierarchyPath(
      countryData,
      values as string[],
      options
    )

    if (!resolved) {
      return address
    }

    const next: AddressWithValidation = {
      ...address,
      postalCode: { value: resolved.postalCode },
    }

    if (options.canonicalizeLevels) {
      levels.forEach((level, index) => {
        next[level] = { value: resolved.keys[index] }
      })
    }

    return next
  }
}

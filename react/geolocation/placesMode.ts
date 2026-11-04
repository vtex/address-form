import { logPlacesApiFallback } from '../metrics'

export type PlacesMode = 'new' | 'legacy'

export const UNSUPPORTED_MAPS_VERSION = 'unsupported-maps-version'
export const API_NOT_ENABLED = 'api-not-enabled'

const UNAVAILABLE_ERROR_PATTERNS = [
  /PERMISSION_DENIED/i,
  /REQUEST_DENIED/i,
  /API_KEY_SERVICE_BLOCKED/i,
  /has not been used/i,
  /not authorized/i,
  /not enabled/i,
  /is disabled/i,
  /ApiNotActivated/i,
]

// Once a page falls back to the legacy widgets it stays there, so every
// GeolocationInput mounted later skips the new API.
let legacyFallbackReason: string | null = null

export function resolvePlacesMode(googleMaps): PlacesMode {
  if (legacyFallbackReason) {
    return 'legacy'
  }

  const places = googleMaps?.places

  if (!places?.AutocompleteSuggestion || !places?.AutocompleteSessionToken) {
    return 'legacy'
  }

  return 'new'
}

export function markLegacyFallback(reason: string, country?: string) {
  if (legacyFallbackReason) {
    return
  }

  legacyFallbackReason = reason
  logPlacesApiFallback({ reason, country })
}

export function isPlacesApiNewUnavailableError(error: unknown): boolean {
  if (!error) {
    return false
  }

  const { code = '', message = '' } = (typeof error === 'object'
    ? error
    : { message: String(error) }) as { code?: unknown; message?: unknown }

  const description = `${code} ${message}`

  return UNAVAILABLE_ERROR_PATTERNS.some((pattern) => pattern.test(description))
}

export function getFallbackReason(error: unknown): string {
  const code = (error as { code?: unknown } | null)?.code

  return typeof code === 'string' && code ? code : API_NOT_ENABLED
}

// Test-only: clears the page-wide fallback decision.
export function resetPlacesMode() {
  legacyFallbackReason = null
}

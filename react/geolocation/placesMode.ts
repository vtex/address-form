import { logPlacesApiNewError } from '../metrics'

export const UNSUPPORTED_MAPS_VERSION = 'unsupported-maps-version'
export const API_NOT_ENABLED = 'api-not-enabled'

// Places API (New) rejects with an RpcError whose `code` is the numeric gRPC
// status. PERMISSION_DENIED (7) covers keys that block the API
// (API_KEY_SERVICE_BLOCKED) and projects where it is disabled
// (SERVICE_DISABLED). Network (14) and quota (8) errors stay transient.
const GRPC_PERMISSION_DENIED = 7
const GRPC_STATUS_DETAILS = 'grpc-web-status-details-bin'
const ERROR_INFO_REASON = /google\.rpc\.ErrorInfo\\*",\s*\[\\*"([A-Z_]+)/

const UNAVAILABLE_ERROR_PATTERNS = [
  /PERMISSION_DENIED/i,
  /REQUEST_DENIED/i,
  /API_KEY_SERVICE_BLOCKED/i,
  /SERVICE_DISABLED/i,
  /are blocked/i,
  /has not been used/i,
  /not authorized/i,
  /not enabled/i,
  /is disabled/i,
  /ApiNotActivated/i,
]

interface ErrorLike {
  code?: unknown
  message?: unknown
  metadata?: unknown
}

function getMetadataText(metadata: unknown): string {
  if (!metadata || typeof metadata !== 'object') {
    return ''
  }

  const details = (metadata as Record<string, unknown>)[GRPC_STATUS_DETAILS]

  if (typeof details === 'string') {
    return details
  }

  try {
    return JSON.stringify(metadata)
  } catch (error) {
    return ''
  }
}

function getErrorInfoReason(error: ErrorLike): string | null {
  const match = ERROR_INFO_REASON.exec(getMetadataText(error.metadata))

  return match ? match[1] : null
}

function toErrorLike(error: unknown): ErrorLike {
  return typeof error === 'object' && error !== null
    ? (error as ErrorLike)
    : { message: String(error) }
}

export type PlacesApiPreference = 'legacy' | 'new'

// Set per store by the Checkout page (portal v2 site configuration rendered
// into `window.vtex`). Anything other than "new" (missing, invalid or the
// unrendered template placeholder) keeps the legacy Places widgets.
export function getPlacesApiPreference(): PlacesApiPreference {
  const value =
    typeof window === 'undefined' ? undefined : window.vtex?.googlePlacesApi

  return typeof value === 'string' && value.trim().toLowerCase() === 'new'
    ? 'new'
    : 'legacy'
}

export function isPlacesApiNewSupported(googleMaps): boolean {
  const places = googleMaps?.places

  return !!(places?.AutocompleteSuggestion && places?.AutocompleteSessionToken)
}

// One event per page is enough to spot a store whose key or Maps version
// cannot serve Places API (New); every keystroke would otherwise log again.
let placesApiNewErrorReported = false

export function reportPlacesApiNewError(reason: string, country?: string) {
  if (placesApiNewErrorReported) {
    return
  }

  placesApiNewErrorReported = true
  logPlacesApiNewError({ reason, country })
}

export function isPlacesApiNewUnavailableError(error: unknown): boolean {
  if (!error) {
    return false
  }

  const errorLike = toErrorLike(error)

  if (errorLike.code === GRPC_PERMISSION_DENIED) {
    return true
  }

  const description = [
    errorLike.code ?? '',
    errorLike.message ?? '',
    String(error),
    getMetadataText(errorLike.metadata),
  ].join(' ')

  return UNAVAILABLE_ERROR_PATTERNS.some((pattern) => pattern.test(description))
}

export function getPlacesApiNewErrorReason(error: unknown): string {
  if (!error) {
    return API_NOT_ENABLED
  }

  const errorLike = toErrorLike(error)
  const reason = getErrorInfoReason(errorLike)

  if (reason) {
    return reason
  }

  if (typeof errorLike.code === 'string' && errorLike.code) {
    return errorLike.code
  }

  if (errorLike.code === GRPC_PERMISSION_DENIED) {
    return 'PERMISSION_DENIED'
  }

  return API_NOT_ENABLED
}

// Test-only: allows the next error to be reported again.
export function resetPlacesApiNewErrorReport() {
  placesApiNewErrorReported = false
}

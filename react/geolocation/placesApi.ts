import { logPlacesApiNewError } from '../metrics'

export const UNSUPPORTED_MAPS_VERSION = 'unsupported-maps-version'

// Places API (New) rejects with an RpcError whose `code` is the numeric gRPC
// status and whose reason (e.g. API_KEY_SERVICE_BLOCKED, SERVICE_DISABLED)
// only appears in the grpc-web status details metadata.
const GRPC_PERMISSION_DENIED = 7
const GRPC_STATUS_DETAILS = 'grpc-web-status-details-bin'
const ERROR_INFO_REASON = /google\.rpc\.ErrorInfo\\*",\s*\[\\*"([A-Z_]+)/
const CONFIGURATION_REASON = /^(API_KEY_|SERVICE_DISABLED$)/

interface RpcErrorLike {
  code?: unknown
  metadata?: unknown
}

function getErrorInfoReason(error: RpcErrorLike): string | null {
  const { metadata } = error

  if (!metadata || typeof metadata !== 'object') {
    return null
  }

  const details = (metadata as Record<string, unknown>)[GRPC_STATUS_DETAILS]
  const match =
    typeof details === 'string' ? ERROR_INFO_REASON.exec(details) : null

  return match ? match[1] : null
}

function toRpcErrorLike(error: unknown): RpcErrorLike {
  return typeof error === 'object' && error !== null
    ? (error as RpcErrorLike)
    : {}
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

// A key or project that cannot call Places API (New): PERMISSION_DENIED, or an
// API key / disabled service reason. Network and quota errors are transient.
export function isPlacesApiNewConfigurationError(error: unknown): boolean {
  const rpcError = toRpcErrorLike(error)

  if (rpcError.code === GRPC_PERMISSION_DENIED) {
    return true
  }

  const reason = getErrorInfoReason(rpcError)

  return !!reason && CONFIGURATION_REASON.test(reason)
}

export function getPlacesApiNewErrorReason(error: unknown): string {
  const rpcError = toRpcErrorLike(error)
  const reason = getErrorInfoReason(rpcError)

  if (reason) {
    return reason
  }

  return rpcError.code === GRPC_PERMISSION_DENIED
    ? 'PERMISSION_DENIED'
    : 'UNKNOWN'
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

// Test-only: allows the next error to be reported again.
export function resetPlacesApiNewErrorReport() {
  placesApiNewErrorReported = false
}

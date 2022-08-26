import type { AddressValues, Fields } from './types/address'

export const TYPES = {
  INFO: 'Info',
  WARNING: 'Warning',
  ERROR: 'Error',
  FATAL: 'Fatal',
}

export const LEVELS = {
  DEBUG: 'Debug',
  DEFAULT: 'Default',
  IMPORTANT: 'Important',
  CRITICAL: 'Critical',
}

declare global {
  interface Window {
    vtex?: {
      accountName?: string
      vtexid?: {
        accountName?: string
      }
    }
    vtexjs?: {
      checkout?: {
        orderFormId?: string
      }
    }
    __RUNTIME__?: {
      account?: string
    }
    logSplunk?: (config: any) => void
  }
}

function getAccountName() {
  return (
    window.vtex?.accountName ??
    window.vtex?.vtexid?.accountName ??
    window.__RUNTIME__?.account
  )
}

interface LogGeolocationAddressMismatchData {
  fieldValue: AddressValues | null
  fieldName: Fields
  countryFromRules: string | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  address: Record<string, any>
}

export function logGeolocationAddressMismatch({
  fieldValue,
  fieldName,
  countryFromRules,
  address,
}: LogGeolocationAddressMismatchData) {
  const eventData = {
    fieldValue: (fieldValue ?? '') as string,
    fieldName,
    countryFromRules: countryFromRules ?? 'null',
    query: address.addressQuery?.value ?? '',
    country: address.country?.value ?? '',
    state: address.state?.value ?? '',
    city: address.city?.value ?? '',
    street: address.street?.value ?? '',
    number: address.number?.value ?? '',
    postalCode: address.postalCode?.value ?? '',
    lat: address.geoCoordinates?.value?.[1] ?? '',
    lon: address.geoCoordinates?.value?.[0] ?? '',
    type: address.addressType?.value ?? '',
    orderFormId: window.vtexjs?.checkout?.orderFormId ?? '',
    addressFormVersion: process.env.VTEX_APP_VERSION ?? '',
    urlPathname: document.location.pathname,
    urlHash: document.location.hash,
  }

  try {
    window.logSplunk?.({
      level: LEVELS.DEBUG,
      type: TYPES.WARNING,
      workflowType: 'address-form',
      workflowInstance: 'validate-field',
      event: eventData,
    })
  } catch (error) {
    // ignore failed log
  }
}

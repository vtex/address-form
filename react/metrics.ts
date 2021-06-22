import SplunkEvents from 'splunk-events'

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

interface CustomWindow extends Window {
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
}

declare let window: CustomWindow

const splunkEvents = new SplunkEvents()

splunkEvents.config({
  endpoint: 'https://splunk-heavyforwarder-public.vtex.com:8088',
  token: '50fe94b0-30b6-442a-9cb1-a476c97ba917',
  headers: {
    'Content-Type': 'text/plain',
  },
})

function getAccountName() {
  return (
    window.vtex?.accountName ??
    window.vtex?.vtexid?.accountName ??
    window.__RUNTIME__?.account
  )
}

type EventData = Parameters<typeof splunkEvents.logEvent>[4]

interface LogGeolocationAddressMismatchData {
  fieldValue: string
  fieldName: string
  countryFromRules: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  address: Record<string, any>
}

export function logGeolocationAddressMismatch({
  fieldValue,
  fieldName,
  countryFromRules,
  address,
}: LogGeolocationAddressMismatchData) {
  const eventData: EventData = {
    fieldValue,
    fieldName,
    countryFromRules,
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
    splunkEvents.logEvent(
      LEVELS.DEBUG,
      TYPES.WARNING,
      'address-form',
      'validate-field',
      eventData,
      getAccountName()
    )
  } catch (error) {
    // ignore failed log
  }
}

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
  __RENDER_7_COMPONENTS__?: Record<string, unknown>
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
  return window.vtex?.accountName ?? window?.vtex?.vtexid?.accountName
}

interface LogGeolocationAddressMismatchData {
  fieldValue: string
  fieldName: string
  country: string
  address: Record<string, unknown>
}

export function logGeolocationAddressMismatch(
  data: LogGeolocationAddressMismatchData
) {
  const serializedAddress = JSON.stringify(data.address)

  const eventData = {
    ...data,
    address: serializedAddress,
    orderFormId: window.vtexjs?.checkout?.orderFormId ?? '',
    addressFormVersion: process.env.VTEX_APP_VERSION ?? '',
  }

  splunkEvents.logEvent(
    LEVELS.DEBUG,
    TYPES.WARNING,
    'address-form',
    'validate-field',
    eventData,
    getAccountName()
  )
}

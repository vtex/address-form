import {
  getPlacesApiNewErrorReason,
  getPlacesApiPreference,
  isPlacesApiNewConfigurationError,
  isPlacesApiNewSupported,
  reportPlacesApiNewError,
  resetPlacesApiNewErrorReport,
} from './placesApi'
import {
  apiKeyServiceBlockedError,
  createRpcError,
} from './__mocks__/placesApiNew'

const googleMapsWithNewApi = {
  places: {
    AutocompleteSuggestion: {},
    AutocompleteSessionToken: function AutocompleteSessionToken() {},
  },
}

describe('placesApi', () => {
  beforeEach(() => {
    resetPlacesApiNewErrorReport()
    window.logSplunk = () => {}
    jest.spyOn(window, 'logSplunk')
  })

  afterEach(() => {
    delete window.logSplunk
    delete window.vtex
  })

  it.each([
    [undefined, 'legacy'],
    ['legacy', 'legacy'],
    ['new', 'new'],
    [' NEW ', 'new'],
    ['{{ config.googlePlacesApi }}', 'legacy'],
    ['true', 'legacy'],
    ['', 'legacy'],
  ])('reads the store preference %p as %p', (value, expected) => {
    window.vtex = value === undefined ? {} : { googlePlacesApi: value }

    expect(getPlacesApiPreference()).toBe(expected)
  })

  it('defaults to legacy when window.vtex is missing', () => {
    delete window.vtex

    expect(getPlacesApiPreference()).toBe('legacy')
  })

  it('detects whether the loaded Maps version has the new API classes', () => {
    expect(isPlacesApiNewSupported(googleMapsWithNewApi)).toBe(true)
    expect(isPlacesApiNewSupported({ places: {} })).toBe(false)
    expect(isPlacesApiNewSupported(undefined)).toBe(false)
  })

  it('reports a Places API (New) error to Splunk only once per page', () => {
    reportPlacesApiNewError('API_KEY_SERVICE_BLOCKED', 'BRA')
    reportPlacesApiNewError('SERVICE_DISABLED', 'ARG')

    expect(window.logSplunk).toHaveBeenCalledTimes(1)
    expect(window.logSplunk).toHaveBeenCalledWith(
      expect.objectContaining({
        workflowType: 'address-form',
        workflowInstance: 'places-api-new-error',
        event: expect.objectContaining({
          reason: 'API_KEY_SERVICE_BLOCKED',
          country: 'BRA',
        }),
      })
    )
  })

  it.each([
    ['a key that blocks Places API (New)', apiKeyServiceBlockedError()],
    [
      'a project where the API is disabled',
      createRpcError(
        7,
        'Places API (New) has not been used in project 123 before or it is disabled.',
        'SERVICE_DISABLED'
      ),
    ],
    ['PERMISSION_DENIED without metadata', createRpcError(7, 'denied')],
    [
      'an invalid key',
      createRpcError(3, 'API key not valid.', 'API_KEY_INVALID'),
    ],
  ])('treats %s as a configuration error', (_description, error) => {
    expect(isPlacesApiNewConfigurationError(error)).toBe(true)
  })

  it.each([
    ['a network error', createRpcError(14, 'Network error')],
    [
      'a quota error',
      createRpcError(8, 'Quota exceeded', 'RATE_LIMIT_EXCEEDED'),
    ],
    ['a plain Error', new Error('Failed to fetch')],
    ['null', null],
    ['undefined', undefined],
  ])('does not treat %s as a configuration error', (_description, error) => {
    expect(isPlacesApiNewConfigurationError(error)).toBe(false)
  })

  it('reads the reason from the RpcError metadata', () => {
    expect(getPlacesApiNewErrorReason(apiKeyServiceBlockedError())).toBe(
      'API_KEY_SERVICE_BLOCKED'
    )
  })

  it('falls back to PERMISSION_DENIED or UNKNOWN when there is no metadata reason', () => {
    expect(getPlacesApiNewErrorReason(createRpcError(7, 'denied'))).toBe(
      'PERMISSION_DENIED'
    )
    expect(getPlacesApiNewErrorReason(new Error('boom'))).toBe('UNKNOWN')
  })
})

import {
  API_NOT_ENABLED,
  getPlacesApiNewErrorReason,
  getPlacesApiPreference,
  isPlacesApiNewSupported,
  isPlacesApiNewUnavailableError,
  reportPlacesApiNewError,
  resetPlacesApiNewErrorReport,
} from './placesMode'
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

describe('placesMode', () => {
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
    [{ code: 'PERMISSION_DENIED', message: 'denied' }],
    [{ code: 'REQUEST_DENIED' }],
    [new Error('Places API (New) has not been used in project 123')],
    [new Error('This API key is not authorized to use this service')],
    [{ message: 'LegacyApiNotActivatedMapError' }],
    ['API_KEY_SERVICE_BLOCKED'],
  ])('treats %p as the new API being unavailable', (error) => {
    expect(isPlacesApiNewUnavailableError(error)).toBe(true)
  })

  it('treats the RpcError of a key that blocks Places API (New) as unavailable', () => {
    expect(isPlacesApiNewUnavailableError(apiKeyServiceBlockedError())).toBe(
      true
    )
  })

  it('treats a numeric PERMISSION_DENIED RpcError as unavailable', () => {
    expect(
      isPlacesApiNewUnavailableError(
        createRpcError(
          7,
          'Places API (New) has not been used in project 123 before or it is disabled.',
          'SERVICE_DISABLED'
        )
      )
    ).toBe(true)
  })

  it.each([
    [createRpcError(14, 'Network error')],
    [createRpcError(8, 'Quota exceeded', 'RATE_LIMIT_EXCEEDED')],
    [new Error('Failed to fetch')],
    [{ code: 'OVER_QUERY_LIMIT', message: 'rate limited' }],
    [{ code: 'UNKNOWN_ERROR' }],
    [null],
    [undefined],
  ])('does not treat %p as the new API being unavailable', (error) => {
    expect(isPlacesApiNewUnavailableError(error)).toBe(false)
  })

  it('uses the error code as reason when present', () => {
    expect(getPlacesApiNewErrorReason({ code: 'PERMISSION_DENIED' })).toBe(
      'PERMISSION_DENIED'
    )
    expect(getPlacesApiNewErrorReason(new Error('not enabled'))).toBe(
      API_NOT_ENABLED
    )
  })

  it('uses the RpcError metadata reason as reason', () => {
    expect(getPlacesApiNewErrorReason(apiKeyServiceBlockedError())).toBe(
      'API_KEY_SERVICE_BLOCKED'
    )
    expect(getPlacesApiNewErrorReason(createRpcError(7, 'denied'))).toBe(
      'PERMISSION_DENIED'
    )
  })
})

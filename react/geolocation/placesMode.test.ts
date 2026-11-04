import {
  API_NOT_ENABLED,
  getFallbackReason,
  isPlacesApiNewUnavailableError,
  markLegacyFallback,
  resetPlacesMode,
  resolvePlacesMode,
} from './placesMode'

const googleMapsWithNewApi = {
  places: {
    AutocompleteSuggestion: {},
    AutocompleteSessionToken: function AutocompleteSessionToken() {},
  },
}

describe('placesMode', () => {
  beforeEach(() => {
    resetPlacesMode()
    jest.spyOn(window, 'logSplunk').mockImplementation()
  })

  afterEach(() => {
    delete window.logSplunk
  })

  it('uses the new API when its classes are available', () => {
    expect(resolvePlacesMode(googleMapsWithNewApi)).toBe('new')
  })

  it('uses the legacy widgets when the new API classes are missing', () => {
    expect(resolvePlacesMode({ places: {} })).toBe('legacy')
    expect(resolvePlacesMode(null)).toBe('legacy')
  })

  it('stays in legacy mode for the page after a fallback', () => {
    markLegacyFallback('PERMISSION_DENIED', 'BRA')

    expect(resolvePlacesMode(googleMapsWithNewApi)).toBe('legacy')
  })

  it('logs the fallback to Splunk only once', () => {
    markLegacyFallback('PERMISSION_DENIED', 'BRA')
    markLegacyFallback('REQUEST_DENIED', 'ARG')

    expect(window.logSplunk).toHaveBeenCalledTimes(1)
    expect(window.logSplunk).toHaveBeenCalledWith(
      expect.objectContaining({
        workflowType: 'address-form',
        workflowInstance: 'places-api-fallback',
        event: expect.objectContaining({
          reason: 'PERMISSION_DENIED',
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

  it.each([
    [new Error('Failed to fetch')],
    [{ code: 'OVER_QUERY_LIMIT', message: 'rate limited' }],
    [{ code: 'UNKNOWN_ERROR' }],
    [null],
    [undefined],
  ])('does not treat %p as the new API being unavailable', (error) => {
    expect(isPlacesApiNewUnavailableError(error)).toBe(false)
  })

  it('uses the error code as fallback reason when present', () => {
    expect(getFallbackReason({ code: 'PERMISSION_DENIED' })).toBe(
      'PERMISSION_DENIED'
    )
    expect(getFallbackReason(new Error('not enabled'))).toBe(API_NOT_ENABLED)
  })
})

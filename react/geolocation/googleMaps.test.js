describe('googleMaps', () => {
  let shouldResolve = true

  const mockLoad = jest.fn(() => {
    return new Promise((resolve, reject) => {
      if (shouldResolve) {
        resolve({ imGoogle: true })
      } else {
        reject({ error: true })
      }
    })
  })

  jest.mock('load-google-maps-api', () => mockLoad)

  const loadGoogleMaps = require('./googleMaps').default

  const locale = 'pt'
  const API_KEY = '123'

  const expectedCall = {
    key: API_KEY,
    language: locale,
    libraries: ['places'],
  }

  it('should handle rejection', () => {
    shouldResolve = false
    mockLoad.mockClear()

    const result = loadGoogleMaps({ locale: 'es', apiKey: '123' })

    return expect(result).rejects.toBeDefined()
  })

  it('should return a GoogleMaps instance', () => {
    shouldResolve = true
    mockLoad.mockClear()

    loadGoogleMaps({ locale, apiKey: API_KEY })

    expect(mockLoad).toHaveBeenCalledWith(expectedCall)
  })

  it('should use the cached version', () => {
    shouldResolve = true
    mockLoad.mockClear()

    loadGoogleMaps({ locale, apiKey: API_KEY })

    expect(mockLoad).not.toHaveBeenCalled()
  })
})

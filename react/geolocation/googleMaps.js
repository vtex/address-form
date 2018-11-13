import loadGoogleMapsAPI from 'load-google-maps-api'

let cachedGoogleMapsAPI = null

export default function loadGoogleMaps({ locale, apiKey }) {
  if (cachedGoogleMapsAPI) {
    return Promise.resolve(cachedGoogleMapsAPI)
  }

  return new Promise((resolve, reject) => {
    return loadGoogleMapsAPI({
      key: apiKey,
      language: locale,
      libraries: ['places'],
    })
      .then(googleMaps => {
        cachedGoogleMapsAPI = googleMaps
        return resolve(googleMaps)
      })
      .catch(error => {
        return reject(error)
      })
  })
}

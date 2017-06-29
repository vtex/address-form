export default function loadGoogleMaps({ locale, apiKey }) {
  return new Promise((resolve, reject) => {
    resolve({ locale, apiKey })
  })
}

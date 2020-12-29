export default function loadGoogleMaps({ locale, apiKey }) {
  return new Promise((resolve) => {
    resolve({ locale, apiKey })
  })
}

import countryCodes from 'i18n-iso-countries/codes.json'
import find from 'lodash/find'

export function getISOAlpha2(countryCodeAlpha3) {
  const country = find(
    countryCodes,
    country => country[1] === countryCodeAlpha3
  )

  return country ? country[0] : null
}

export function getISOAlpha3(countryCodeAlpha2) {
  const country = find(
    countryCodes,
    country => country[0] === countryCodeAlpha2
  )

  return country ? country[1] : null
}

import { THREE_LEVELS } from '../constants'
import { thirdLevelPostalCodes } from '../transforms/postalCodes'
import {
  getOneLevel,
  getTwoLevels,
  getThreeLevels,
} from '../transforms/addressFieldsOptions'
import cleanStr from '../selectors/cleanStr'
import type { PostalCodeRules } from '../types/rules'
import countryData from './data/PER.json'

/**
 * Google prefixes Peruvian administrative names with the level, e.g.
 * "Provincia de Chincha", "Distrito de Lima" or
 * "Provincia Constitucional del Callao", while `countryData` keys hold
 * only the bare name.
 */
const stripGeoLevelPrefix = (name: string) =>
  name.replace(
    /^(provincia( constitucional)?|departamento|distrito|region) de(l)?\s+/i,
    ''
  )

const normalizeGeoName = (name?: string | null) =>
  name ? cleanStr(stripGeoLevelPrefix(name)) : ''

/**
 * Finds the canonical `countryData` key matching a name returned by
 * Google, tolerating level prefixes, casing and accent differences
 * (INEI names may differ in accents/casing from Google).
 */
const findCountryDataKey = (
  data: Record<string, unknown>,
  name?: string | null
): string | undefined => {
  if (!name) {
    return undefined
  }

  if (data[name] !== undefined) {
    return name
  }

  const normalizedName = normalizeGeoName(name)

  return Object.keys(data).find((key) => cleanStr(key) === normalizedName)
}

const rules: PostalCodeRules = {
  country: 'PER',
  abbr: 'PE',
  postalCodeFrom: THREE_LEVELS,
  postalCodeLevels: ['state', 'city', 'neighborhood'],
  thirdLevelPostalCodes: thirdLevelPostalCodes(countryData),
  fields: [
    {
      hidden: true,
      name: 'country',
      maxLength: 100,
      label: 'country',
      size: 'medium',
    },
    {
      autoComplete: 'nope',
      hidden: true,
      label: 'postalCode',
      maxLength: 50,
      name: 'postalCode',
      postalCodeAPI: false,
      regex: /^(\d{5,6})$/,
      size: 'small',
    },
    {
      name: 'street',
      label: 'street',
      required: true,
      size: 'xlarge',
    },
    {
      name: 'number',
      maxLength: 750,
      label: 'number',
      required: true,
      size: 'mini',
      autoComplete: 'nope',
    },
    {
      name: 'complement',
      maxLength: 750,
      label: 'complement',
      size: 'large',
    },
    {
      hidden: true,
      name: 'reference',
      maxLength: 750,
      label: 'reference',
      size: 'xlarge',
    },
    {
      name: 'state',
      maxLength: 100,
      label: 'department',
      required: true,
      size: 'large',
      level: 1,
      options: getOneLevel(countryData),
    },
    {
      name: 'city',
      maxLength: 100,
      label: 'province',
      required: true,
      size: 'large',
      level: 2,
      basedOn: 'state',
      optionsMap: getTwoLevels(countryData),
    },
    {
      name: 'neighborhood',
      maxLength: 100,
      label: 'district',
      required: true,
      size: 'large',
      level: 3,
      basedOn: 'city',
      optionsMap: getThreeLevels(countryData),
    },
    {
      name: 'receiverName',
      elementName: 'receiver',
      maxLength: 750,
      label: 'receiverName',
      size: 'xlarge',
      required: true,
    },
  ],
  geolocation: {
    // Google's postal_code component holds Peru's 5-digit CPN, which VTEX
    // stores don't use — shipping is configured with the 6-digit INEI
    // ubigeos in countryData. `types` is intentionally omitted so Google's
    // CPN is never copied into the address; the handler derives the ubigeo
    // from the department/province/district instead.
    postalCode: {
      required: false,
      handler: (address) => {
        if (!address.state || !address.city || !address.neighborhood) {
          return address
        }

        let stateKey = findCountryDataKey(countryData, address.state.value)
        let cityKey = stateKey
          ? findCountryDataKey(countryData[stateKey], address.city.value)
          : undefined

        let neighborhoodKey =
          stateKey && cityKey
            ? findCountryDataKey(
                countryData[stateKey][cityKey],
                address.neighborhood.value
              )
            : undefined

        // Google often attributes Callao (and similar) to Lima. If the
        // department/province path misses, search every department for the
        // province + district pair.
        if (!neighborhoodKey) {
          const states = Object.keys(countryData)

          for (let i = 0; i < states.length; i++) {
            const state = states[i]
            const city = findCountryDataKey(
              countryData[state],
              address.city.value
            )

            if (!city) {
              continue
            }

            const neighborhood = findCountryDataKey(
              countryData[state][city],
              address.neighborhood.value
            )

            if (neighborhood) {
              stateKey = state
              cityKey = city
              neighborhoodKey = neighborhood
              break
            }
          }
        }

        if (!stateKey || !cityKey || !neighborhoodKey) {
          return address
        }

        address.state = { value: stateKey }
        address.city = { value: cityKey }
        address.neighborhood = { value: neighborhoodKey }
        address.postalCode = {
          value: countryData[stateKey][cityKey][neighborhoodKey],
        }

        return address
      },
    },

    number: {
      valueIn: 'long_name',
      types: ['street_number'],
      required: true,
      notApplicable: true,
    },

    street: { valueIn: 'long_name', types: ['route'] },

    neighborhood: {
      valueIn: 'long_name',
      types: ['administrative_area_level_3', 'locality'],
      handler: (address) => {
        if (!address.neighborhood || !address.neighborhood.value) {
          return address
        }

        // e.g. 'Distrito de Lima' -> 'Lima'
        address.neighborhood = {
          value: stripGeoLevelPrefix(address.neighborhood.value),
        }

        return address
      },
    },

    state: {
      valueIn: 'long_name',
      types: ['administrative_area_level_1'],
      handler: (address) => {
        if (!address.state) {
          return address
        }

        // e.g. 'Provincia de Lima' -> 'Lima'
        const stateKey = findCountryDataKey(countryData, address.state.value)

        if (stateKey) {
          address.state = { value: stateKey }

          return address
        }

        if (!address.city || !address.city.value) {
          return address
        }

        // Google returned something that isn't a department — infer the
        // department from the province instead.
        const cityName = normalizeGeoName(address.city.value)
        const states = Object.keys(countryData)

        for (let i = 0; i < states.length; i++) {
          const state = states[i]
          const hasCity = Object.keys(countryData[state]).some(
            (city) => cleanStr(city) === cityName
          )

          if (hasCity) {
            address.state = { value: state }

            return address
          }
        }

        return address
      },
    },

    city: {
      valueIn: 'long_name',
      types: ['administrative_area_level_2'],
      handler: (address) => {
        if (!address.city || !address.city.value) {
          return address
        }

        const stateKey = findCountryDataKey(countryData, address.state?.value)
        const cityKey = stateKey
          ? findCountryDataKey(countryData[stateKey], address.city.value)
          : undefined

        // e.g. 'Provincia de Chincha' -> 'Chincha'
        address.city = {
          value: cityKey ?? stripGeoLevelPrefix(address.city.value),
        }

        return address
      },
    },

    receiverName: {
      required: true,
    },
  },
  summary: [
    [
      { name: 'street' },
      { delimiter: ' ', name: 'number' },
      { delimiter: ' ', name: 'complement' },
    ],
    [{ name: 'neighborhood' }],
    [{ name: 'city' }, { delimiter: ', ', name: 'state' }],
  ],
}

export default rules

import { THREE_LEVELS } from '../constants'
import { thirdLevelPostalCodes } from '../transforms/postalCodes'
import {
  getOneLevel,
  getTwoLevels,
  getThreeLevels,
} from '../transforms/addressFieldsOptions'
import {
  createPostalCodeFromHierarchyHandler,
  findCountryDataKey,
  normalizeGeoName,
  stripGeoLevelPrefix,
} from '../transforms/geolocationPostalCodeFromHierarchy'
import cleanStr from '../selectors/cleanStr'
import type { PostalCodeRules } from '../types/rules'
import countryData from './data/PER.json'

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
      handler: createPostalCodeFromHierarchyHandler(
        countryData,
        ['state', 'city', 'neighborhood'],
        {
          normalizeKeys: true,
          crossFirstLevelFallback: true,
          canonicalizeLevels: true,
        }
      ),
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
        if (!address.neighborhood?.value) {
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

        if (!address.city?.value) {
          return address
        }

        // Google returned something that isn't a department — infer the
        // department from the province instead.
        const cityName = normalizeGeoName(address.city.value)

        for (const state of Object.keys(countryData)) {
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
        if (!address.city?.value) {
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

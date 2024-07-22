import { THREE_LEVELS } from '../constants'
import { thirdLevelPostalCodes } from '../transforms/postalCodes'
import {
  getOneLevel,
  getTwoLevels,
  getThreeLevels,
} from '../transforms/addressFieldsOptions'
import type { PostalCodeRules } from '../types/rules'
import countryData from './data/CRI.json'

const rules: PostalCodeRules = {
  country: 'CRI',
  abbr: 'CR',
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
      maxLength: 5,
      name: 'postalCode',
      postalCodeAPI: false,
      required: true,
      regex: /^([\d]{5})$/,
      size: 'small',
    },
    {
      name: 'street',
      label: 'street',
      required: true,
      size: 'xlarge',
    },
    {
      hidden: true,
      name: 'number',
      maxLength: 750,
      label: 'number',
      required: false,
      autoComplete: 'nope',
    },
    {
      name: 'complement',
      maxLength: 750,
      label: 'complement',
      size: 'xlarge',
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
      size: 'xlarge',
      level: 1,
      options: getOneLevel(countryData),
    },
    {
      name: 'city',
      maxLength: 100,
      label: 'province',
      required: true,
      size: 'xlarge',
      level: 2,
      basedOn: 'state',
      optionsMap: getTwoLevels(countryData),
    },
    {
      name: 'neighborhood',
      maxLength: 100,
      label: 'district',
      required: true,
      size: 'xlarge',
      level: 3,
      basedOn: 'city',
      optionsMap: getThreeLevels(countryData),
    },
    {
      hidden: true,
      name: 'receiverName',
      elementName: 'receiver',
      maxLength: 750,
      label: 'receiverName',
      size: 'xlarge',
      required: false,
    },
    {
      hidden: true,
      name: 'contactId',
      maxLength: 100,
      label: 'contactId',
      size: 'xlarge',
      required: false,
    },
  ],
  geolocation: {
    postalCode: {
      valueIn: 'long_name',
      types: ['postal_code'],
      required: false,
      handler: (address) => {
        if (!address.state || !address.city || !address.neighborhood) {
          return address
        }

        if (
          address.state.value &&
          countryData[address.state.value] &&
          countryData[address.state.value][address.city.value] &&
          countryData[address.state.value][address.city.value][
            address.neighborhood.value
          ]
        ) {
          address.postalCode = {
            value:
              countryData[address.state.value][address.city.value][
                address.neighborhood.value
              ],
          }
        }

        return address
      },
    },

    number: {
      valueIn: 'long_name',
      types: ['street_number'],
      required: false,
      notApplicable: true,
    },

    street: {
      valueIn: 'long_name',
      types: ['route'],
    },

    neighborhood: {
      valueIn: 'long_name',
      types: [
        'neighborhood',
        'sublocality_level_1',
        'sublocality_level_2',
        'sublocality_level_3',
        'sublocality_level_4',
        'sublocality_level_5',
      ],
    },

    state: {
      valueIn: 'short_name',
      types: ['administrative_area_level_1'],
    },

    city: {
      valueIn: 'long_name',
      types: ['administrative_area_level_2', 'locality'],
    },

    receiverName: {
      required: true,
    },
  },
  summary: [
    [{ name: 'street' }, { delimiter: ' ', name: 'complement' }],
    [{ name: 'neighborhood' }],
    [{ name: 'city' }, { delimiter: ', ', name: 'state' }],
  ],
}

export default rules

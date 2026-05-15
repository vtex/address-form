import { ONE_LEVEL } from '../../constants'
import { firstLevelPostalCodes } from '../../transforms/postalCodes'
import {
  getOneLevel,
  getTwoLevels,
} from '../../transforms/addressFieldsOptions'
import type { PostalCodeRules } from '../../types/rules'
import {
  mockComplementField,
  mockNumberField,
  mockReceiverNameField,
  mockStreetField,
} from './sharedMockRuleFields'

const countryData = {
  Azuay: {
    Oña: '0000',
    Paute: '0000',
    Pucara: '0000',
  },
  Bolivar: {
    Caluma: '0001',
    Chillanes: '0001',
  },
}

const rules: PostalCodeRules = {
  country: 'ECU',
  abbr: 'EC',
  postalCodeFrom: ONE_LEVEL,
  postalCodeLevels: ['state'],
  firstLevelPostalCodes: firstLevelPostalCodes(countryData),
  fields: [
    mockStreetField,
    mockNumberField,
    mockComplementField,
    {
      name: 'state',
      maxLength: 100,
      label: 'province',
      required: true,
      size: 'large',
      level: 1,
      options: getOneLevel(countryData),
    },
    {
      name: 'city',
      label: 'city',
      required: true,
      size: 'large',
      basedOn: 'state',
      level: 2,
      optionsMap: getTwoLevels(countryData),
    },
    mockReceiverNameField,
  ],
  geolocation: {
    postalCode: {
      valueIn: 'long_name',
      types: ['postal_code'],
      required: false,
      handler: (address) => {
        if (
          !address.state ||
          !address.city ||
          !address.state.value ||
          !address.city.value
        ) {
          return address
        }

        const postalCodeValue =
          countryData[address.state.value]?.[address.city.value]

        if (postalCodeValue) {
          address.postalCode = {
            value: postalCodeValue,
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
      handler: (address) => {
        return {
          ...address,
          number: { ...address.number, notApplicable: true },
        }
      },
    },

    street: { valueIn: 'long_name', types: ['route'], required: false },

    state: {
      valueIn: 'long_name',
      types: ['administrative_area_level_1'],
      required: false,
    },

    city: {
      valueIn: 'long_name',
      types: ['administrative_area_level_2', 'locality'],
      required: false,
    },

    receiverName: {
      required: true,
    },
  },
}

export default rules

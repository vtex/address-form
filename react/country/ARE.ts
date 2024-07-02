import { ONE_LEVEL } from '../constants'
import { firstLevelPostalCodes } from '../transforms/postalCodes'
import { getOneLevel } from '../transforms/addressFieldsOptions'
import type { PostalCodeRules } from '../types/rules'

const emiratesPostalCodeData = {
  'Abu Dhabi': '00000',
  Dubai: '00000',
  Sharjah: '00000',
  Ajman: '00000',
  'Umm Al Quwain': '00000',
  'Ras Al Khaimah': '00000',
  Fujairah: '00000',
}

const rules: PostalCodeRules = {
  country: 'ARE',
  abbr: 'AE',
  postalCodeFrom: ONE_LEVEL,
  postalCodeLevels: ['reference'],
  firstLevelPostalCodes: firstLevelPostalCodes(emiratesPostalCodeData),
  fields: [
    {
      hidden: true,
      name: 'country',
      maxLength: 100,
      label: 'country',
      size: 'medium',
    },
    {
      hidden: true,
      name: 'postalCode',
      maxLength: 50,
      label: 'postalCode',
      size: 'small',
      autoComplete: 'nope',
      postalCodeAPI: false,
    },
    {
      name: 'street',
      label: 'addressLine1',
      required: true,
      size: 'xlarge',
    },
    {
      name: 'number',
      maxLength: 750,
      label: 'number',
      size: 'small',
      autoComplete: 'nope',
      notApplicable: false,
    },
    {
      name: 'complement',
      maxLength: 750,
      label: 'addressLine2',
      size: 'xlarge',
    },
    {
      name: 'reference',
      maxLength: 750,
      label: 'emirates',
      size: 'xlarge',
      level: 1,
      options: getOneLevel(emiratesPostalCodeData),
    },
    {
      hidden: true,
      name: 'neighborhood',
      maxLength: 100,
      label: 'neighborhood',
      size: 'large',
    },
    {
      name: 'city',
      maxLength: 100,
      label: 'city',
      required: true,
      size: 'large',
    },
    {
      name: 'state',
      maxLength: 100,
      label: 'state',
      required: true,
      size: 'large',
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
    postalCode: {
      valueIn: 'long_name',
      types: ['postal_code'],
      required: false,
    },

    number: {
      valueIn: 'long_name',
      types: ['street_number'],
      required: false,
      notApplicable: false,
    },

    street: { valueIn: 'long_name', types: ['route'] },

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
      valueIn: 'long_name',
      types: ['administrative_area_level_1'],
    },

    city: {
      valueIn: 'long_name',
      types: ['political', 'locality'],
    },

    receiverName: {
      required: true,
    },
  },
  summary: [
    [
      {
        name: 'street',
      },
      {
        delimiter: ' ',
        name: 'number',
      },
      {
        delimiter: ', ',
        name: 'complement',
      },
    ],
    [
      {
        name: 'neighborhood',
        delimiterAfter: ' - ',
      },
      {
        name: 'city',
      },
      {
        delimiter: ' - ',
        name: 'state',
      },
    ],
    [
      {
        name: 'postalCode',
      },
    ],
  ],
}

export default rules

import { POSTAL_CODE } from '../constants'
import type { PostalCodeRules } from '../types/rules'

const rules: PostalCodeRules = {
  country: 'AGO',
  abbr: 'AO',
  postalCodeFrom: POSTAL_CODE,
  fields: [
    {
      hidden: true,
      name: 'country',
      maxLength: 100,
      label: 'country',
      size: 'medium',
    },
    {
      name: 'postalCode',
      maxLength: 10,
      label: 'postalCode',
      required: true,
      mask: '9999',
      regex: '^[a-zA-Z0-9\\s-]{3,10}$',
      size: 'small',
      autoComplete: 'nope',
      postalCodeAPI: false,
    },
    {
      name: 'street',
      label: 'addressLine1',
      maxLength: 150,
      required: true,
      size: 'xlarge',
    },
    {
      name: 'number',
      maxLength: 10,
      label: 'number',
      size: 'small',
      autoComplete: 'nope',
      required: false,
    },
    {
      name: 'complement',
      maxLength: 750,
      label: 'addressLine2',
      required: false,
      size: 'xlarge',
    },
    {
      name: 'reference',
      maxLength: 750,
      label: 'reference',
      required: false,
      size: 'xlarge',
    },
    {
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
      label: 'province',
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
    [{ name: 'street' }, { delimiter: ', ', name: 'complement' }],
    [
      { delimiter: ' ', name: 'postalCode' },
      { delimiter: ' ', name: 'city' },
      { delimiter: ', ', name: 'state' },
    ],
  ],
}

export default rules

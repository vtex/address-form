import { POSTAL_CODE } from '../constants'

export default {
  country: null,
  abbr: null,
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
      maxLength: 50,
      label: 'postalCode',
      size: 'small',
      autoComplete: 'nope',
    },
    {
      name: 'street',
      label: 'addressLine1',
      required: true,
      size: 'xlarge',
    },
    {
      hidden: true,
      name: 'number',
      maxLength: 750,
      label: 'number',
      size: 'small',
      autoComplete: 'nope',
    },
    {
      name: 'complement',
      maxLength: 750,
      label: 'addressLine2',
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
    complement: {
      valueIn: 'long_name',
      types: ['street_number'],
      required: false,
    },
    street: { valueIn: 'long_name', types: ['route'], required: false },
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
      required: false,
    },
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

import { POSTAL_CODE } from '../constants'

export default {
  country: 'PRT',
  abbr: 'PT',
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
      required: true,
      mask: '9999-999',
      regex: '^(?:[\\d]{4})(?:\\-|)(?:[\\d]{3})$',
      forgottenURL:
        'https://www.ctt.pt/feapl_2/app/open/objectSearch/objectSearch.jspx',
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
      label: 'district',
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
      required: true,
    },
    number: { valueIn: 'long_name', types: ['street_number'], required: false },
    street: { valueIn: 'long_name', types: ['route'], required: false },
    neighborhood: {
      valueIn: 'long_name',
      types: ['neighborhood'],
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
        delimiter: ' ',
        name: 'complement',
      },
    ],
    [
      {
        name: 'neighborhood',
      },
    ],
    [
      {
        name: 'city',
      },
    ],
    [
      {
        name: 'postalCode',
      },
      {
        delimiter: ' ',
        name: 'state',
      },
    ],
  ],
}

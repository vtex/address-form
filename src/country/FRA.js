import { POSTAL_CODE } from '../constants'

export default {
  country: 'FRA',
  abbr: 'FR',
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
      label: 'postalCode',
      maxLength: 50,
      required: true,
      mask: '99999',
      regex: '^([\\d]{5})$',
      postalCodeAPI: false,
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
      name: 'complement',
      maxLength: 750,
      label: 'addressLine2',
      size: 'xlarge',
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
      label: 'department',
      required: true,
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
    street: {
      valueIn: 'long_name',
      types: ['route'],
      required: false,
      handler: (address, googleAddress) => {
        address.street = { value: googleAddress.name }
        return address
      },
    },
    city: {
      valueIn: 'long_name',
      types: ['locality'],
      required: false,
    },
    state: {
      valueIn: 'short_name',
      types: ['administrative_area_level_1'],
      required: false,
    },
  },
  summary: [
    [
      {
        name: 'complement',
      },
    ],
    [
      {
        name: 'street',
      },
    ],
    [
      {
        name: 'postalCode',
      },
      {
        delimiter: ' ',
        name: 'city',
      },
    ],
  ],
}

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
        name: 'state',
      },
    ],
  ],
}

import { POSTAL_CODE } from '../constants'

export default {
  country: 'NLD',
  abbr: 'NL',
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
      maxLength: 7,
      required: true,
      mask: NaN,
      regex: /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-zA-Z]{2}$/,
      postalCodeAPI: false,
      size: 'small',
      autoComplete: 'nope',
      autoUpperCase: true,
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
      required: false,
      size: 'mini',
      autoComplete: 'nope',
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
      size: 'xlarge',
    },
    {
      hidden: true,
      name: 'state',
      maxLength: 100,
      label: 'department',
      required: false,
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
      handler: (address, googleAddress) => {
        address.street = { value: googleAddress.name }

        return address
      },
    },

    city: {
      valueIn: 'long_name',
      types: ['locality'],
    },

    state: {
      valueIn: 'short_name',
      types: ['administrative_area_level_1'],
    },

    receiverName: {
      required: true,
    },
  },
  summary: [
    [{ name: 'street' }, { delimiter: ' ', name: 'number' }],
    [{ name: 'complement' }],
    [{ name: 'postalCode' }, { delimiter: ' ', name: 'city' }],
  ],
}

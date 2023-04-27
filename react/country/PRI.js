import { POSTAL_CODE } from '../constants'

export default {
  country: 'PRI',
  abbr: 'PR',
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
      fixedLabel: 'ZIP',
      required: true,
      mask: '99999',
      regex: '^([\\d]{5}((-)?[\\d]{4})?)$',
      postalCodeAPI: true,
      forgottenURL: 'https://tools.usps.com/go/ZipLookupAction!input.action',
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
      hidden: true,
      size: 'large',
      optionsPairs: [
        { label: 'Puerto Rico', value: 'PR' },
      ],
      defaultValue: 'PR'
    },
    {
      name: 'number',
      maxLength: 750,
      label: 'number',
      hidden: true,
      defaultValue: 'N/A',
      autoComplete: 'nope',
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
      types: ['locality'],
    },

    receiverName: {
      required: true,
    },
  },
  summary: [
    [{ name: 'street' }, { delimiter: ', ', name: 'complement' }],
    [
      { name: 'city' },
      { delimiter: ', ', name: 'state' },
      { delimiter: ' ', name: 'postalCode' },
    ],
  ],
}

import { POSTAL_CODE } from '../constants'

export default {
  country: 'GBR',
  abbr: 'GB',
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
      fixedLabel: 'Postcode',
      required: true,
      mask: '',
      regex: /^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})$/,
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
      label: 'town',
      required: true,
      size: 'large',
    },
    {
      name: 'state',
      maxLength: 100,
      label: 'county',
      required: true,
      size: 'large',
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
      types: ['route', 'street_address'],
      handler: (address, googleAddress) => {
        address.street = { value: googleAddress.name }

        return address
      },
    },

    neighborhood: {
      valueIn: 'long_name',
      types: [
        'neighborhood',
        'administrative_area_level_3',
        'administrative_area_level_4',
        'administrative_area_level_5',
        'sublocality',
        'sublocality_level_1',
        'sublocality_level_2',
        'sublocality_level_3',
        'sublocality_level_4',
        'sublocality_level_5',
      ],
    },

    complement: {
      valueIn: 'complement',
      types: [
        'street_number',
        'colloquial_area',
        'floor',
        'room',
        'premise',
        'subpremise',
      ],
    },

    state: {
      valueIn: 'long_name',
      types: ['administrative_area_level_1'],
    },

    city: {
      valueIn: 'long_name',
      types: ['locality', 'administrative_area_level_2'],
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

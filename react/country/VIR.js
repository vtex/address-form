import { POSTAL_CODE } from '../constants'

export default {
  country: 'VIR',
  abbr: 'VI',
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
      mask: '99999-9999',
      regex: '^008(01|02|03|04|05|20|21|22|23|24|30|31|40|41|50|51)-\d{0,4}$',
      // Asserts zipcode starts with 008, then contains one of the local accepted area values, then followed by hyphen and 4 digits.
      postalCodeAPI: true,
      forgottenURL: 'https://tools.usps.com/go/ZipLookupAction!input.action',
      size: 'small',
      autoComplete: 'nope',
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
      hidden: false,
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
        { label: 'Virgin Islands', value: 'USVI' },
      ],
      defaultValue: 'USVI'
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

    number: {
      valueIn: 'long_name',
      types: ['street_number'],
      required: false,
      notApplicable: true,
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

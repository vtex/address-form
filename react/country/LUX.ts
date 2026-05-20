import { POSTAL_CODE } from '../constants'
import type { PostalCodeRules } from '../types/rules'

const rules: PostalCodeRules = {
  country: 'LUX',
  abbr: 'LU',
  postalCodeFrom: POSTAL_CODE,
  postalCodeProtectedFields: ['city', 'state'],
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
      maxLength: 4,
      label: 'postalCode',
      required: true,
      mask: '9999',
      regex: /^\d{4}$/,
      postalCodeAPI: true,
      size: 'small',
      autoComplete: 'nope',
    },
    {
      name: 'street',
      label: 'street',
      required: true,
      size: 'xlarge',
    },
    {
      name: 'number',
      maxLength: 750,
      label: 'number',
      required: true,
      size: 'mini',
      autoComplete: 'nope',
    },
    {
      name: 'complement',
      maxLength: 750,
      label: 'floorAndLetter',
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
      label: 'canton',
      required: true,
      optionsCaption: '',
      optionsPairs: [
        { label: 'Capellen', value: 'CA' },
        { label: 'Clervaux', value: 'CL' },
        { label: 'Diekirch', value: 'DI' },
        { label: 'Echternach', value: 'EC' },
        { label: 'Esch-sur-Alzette', value: 'ES' },
        { label: 'Grevenmacher', value: 'GR' },
        { label: 'Luxembourg', value: 'LU' },
        { label: 'Mersch', value: 'ME' },
        { label: 'Redange', value: 'RD' },
        { label: 'Remich', value: 'RM' },
        { label: 'Vianden', value: 'VD' },
        { label: 'Wiltz', value: 'WI' },
      ],
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
      required: true,
      notApplicable: true,
    },

    street: { valueIn: 'long_name', types: ['route'] },

    neighborhood: {
      valueIn: 'long_name',
      types: ['neighborhood'],
    },

    complement: {
      valueIn: 'long_name',
      types: ['subpremise'],
    },

    state: {
      valueIn: 'long_name',
      types: ['administrative_area_level_1'],
    },

    city: {
      valueIn: 'long_name',
      types: ['locality', 'political'],
    },

    receiverName: {
      required: true,
    },
  },
  summary: [
    [
      { name: 'street' },
      { delimiter: ' ', name: 'number' },
      { delimiter: ', ', name: 'complement' },
    ],
    [
      { name: 'postalCode' },
      { delimiter: ' ', name: 'city' },
    ],
  ],
}

export default rules


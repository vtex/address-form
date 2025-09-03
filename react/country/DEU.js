import { POSTAL_CODE } from '../constants'

export default {
  country: 'DEU',
  abbr: 'DE',
  postalCodeFrom: POSTAL_CODE,
  postalCodeProtectedFields: ['state'],
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
      maxLength: 5,
      label: 'postalCode',
      required: true,
      mask: '99999',
      regex: /^\d{5}$/,
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
      label: 'province',
      required: true,
      optionsCaption: '',
      optionsPairs: [
        { label: 'Baden-Württemberg', value: 'BW' },
        { label: 'Bayern', value: 'BY' },
        { label: 'Berlin', value: 'BE' },
        { label: 'Brandenburg', value: 'BB' },
        { label: 'Bremen', value: 'HB' },
        { label: 'Hamburg', value: 'HH' },
        { label: 'Hessen', value: 'HE' },
        { label: 'Mecklenburg-Vorpommern', value: 'MV' },
        { label: 'Niedersachsen', value: 'NI' },
        { label: 'Nordrhein-Westfalen', value: 'NW' },
        { label: 'Rheinland-Pfalz', value: 'RP' },
        { label: 'Saarland', value: 'SL' },
        { label: 'Sachsen', value: 'SN' },
        { label: 'Sachsen-Anhalt', value: 'ST' },
        { label: 'Schleswig-Holstein', value: 'SH' },
        { label: 'Thüringen', value: 'TH' },
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

    state: {
      valueIn: 'long_name',
      types: ['administrative_area_level_1'],
    },

    city: {
      valueIn: 'long_name',
      types: ['administrative_area_level_2', 'locality'],
    },

    receiverName: {
      required: true,
    },
  },
  summary: [
    [
      { name: 'street' },
      { delimiter: ' ', name: 'number' },
      { delimiter: ' ', name: 'complement' },
    ],
    [
      { name: 'postalCode' },
      { delimiter: ' ', name: 'city' },
      { delimiter: ' (', name: 'state', delimiterAfter: ')' },
    ],
  ],
}

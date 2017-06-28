import { POSTAL_CODE } from '../constants'

export default {
  country: 'PRT',
  abbr: 'PT',
  postalCodeFrom: POSTAL_CODE,
  fields: [
    {
      name: 'postalCode',
      required: true,
      mask: '9999-999',
      regex: '^(?:[\\d]{4})(?:\\-|)(?:[\\d]{3}|)$',
      forgottenURL: 'https://www.ctt.pt/feapl_2/app/open/objectSearch/objectSearch.jspx',
      size: 'small',
    },
    {
      name: 'street',
      label: 'addressLine1',
      required: true,
      size: 'xlarge',
    },
    {
      name: 'complement',
      label: 'addressLine2',
      size: 'xlarge',
    },
    {
      name: 'city',
      label: 'city',
      required: true,
      size: 'large',
    },
    {
      name: 'state',
      label: 'state',
      required: true,
      size: 'large',
      isUpperCase: false,
    },
  ],
  geolocation: {
    postalCode: { valueIn: 'long_name', types: ['postal_code'], required: true },
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
}

import { TWO_LEVELS } from '../constants'

export default {
  country: 'GTM',
  abbr: 'GT',
  postalCodeFrom: TWO_LEVELS,
  postalCodeLevels: ['state', 'city'],
  fields: [
    {
      name: 'state',
      label: 'department',
      required: true,
      size: 'xlarge',
      isUpperCase: false,
    },
    {
      name: 'city',
      label: 'municipality',
      required: true,
      size: 'xlarge',
    },
    {
      name: 'street',
      label: 'street',
      required: true,
      size: 'xlarge',
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

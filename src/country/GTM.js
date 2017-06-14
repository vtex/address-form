import { CITY } from '../constants'

export default {
  postalCodeFrom: CITY,
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
}

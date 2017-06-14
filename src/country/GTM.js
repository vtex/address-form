import { CITY } from '../constants'

export default {
  postalCodeFrom: CITY,
  fields: [
    {
      field: 'state',
      label: 'department',
      required: true,
      size: 'xlarge',
      isUpperCase: false,
    },
    {
      field: 'city',
      label: 'municipality',
      required: true,
      size: 'xlarge',
    },
    {
      field: 'street',
      label: 'street',
      required: true,
      size: 'xlarge',
    },
  ],
}

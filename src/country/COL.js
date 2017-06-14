import { CITY } from '../constants'

export default {
  postalCodeFrom: CITY,
  fields: [
    {
      field: 'street',
      label: 'street',
      required: true,
      size: 'xlarge',
    },
    {
      field: 'complement',
      label: 'complement',
      size: 'large',
    },
    {
      field: 'neighborhood',
      label: 'neighborhood',
      size: 'large',
    },
    {
      field: 'state',
      label: 'department',
      required: true,
      size: 'large',
      isUpperCase: false,
    },
    {
      field: 'city',
      label: 'municipality',
      required: true,
      size: 'large',
    },
  ],
}

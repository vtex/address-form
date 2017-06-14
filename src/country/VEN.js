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
      field: 'number',
      label: 'number',
      required: true,
      size: 'mini',
    },
    {
      field: 'complement',
      label: 'complement',
      size: 'large',
    },
    {
      field: 'state',
      label: 'region',
      required: true,
      size: 'large',
      isUpperCase: false,
    },
    {
      field: 'city',
      label: 'city',
      required: true,
      size: 'large',
    },
    {
      field: 'neighborhood',
      label: 'neighborhood',
      required: true,
      size: 'large',
    },
  ],
}

import { NEIGHBORHOOD } from '../constants'

export default {
  postalCodeFrom: NEIGHBORHOOD,
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
      label: 'department',
      required: true,
      size: 'large',
      isUpperCase: false,
    },
    {
      field: 'city',
      label: 'province',
      required: true,
      size: 'large',
    },
    {
      field: 'neighborhood',
      label: 'district',
      required: true,
      size: 'large',
    },
  ],
}

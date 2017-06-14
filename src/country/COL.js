import { CITY } from '../constants'

export default {
  postalCodeFrom: CITY,
  fields: [
    {
      name: 'street',
      label: 'street',
      required: true,
      size: 'xlarge',
    },
    {
      name: 'complement',
      label: 'complement',
      size: 'large',
    },
    {
      name: 'neighborhood',
      label: 'neighborhood',
      size: 'large',
    },
    {
      name: 'state',
      label: 'department',
      required: true,
      size: 'large',
      isUpperCase: false,
    },
    {
      name: 'city',
      label: 'municipality',
      required: true,
      size: 'large',
    },
  ],
}

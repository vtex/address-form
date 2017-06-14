import { TWO_LEVELS } from '../constants'

export default {
  postalCodeFrom: TWO_LEVELS,
  postalCodeLevels: ['state', 'city'],
  fields: [
    {
      name: 'street',
      label: 'street',
      required: true,
      size: 'xlarge',
    },
    {
      name: 'number',
      label: 'number',
      required: true,
      size: 'mini',
    },
    {
      name: 'complement',
      label: 'complement',
      size: 'large',
    },
    {
      name: 'state',
      label: 'region',
      required: true,
      size: 'large',
      isUpperCase: false,
    },
    {
      name: 'city',
      label: 'city',
      required: true,
      size: 'large',
    },
    {
      name: 'neighborhood',
      label: 'neighborhood',
      required: true,
      size: 'large',
    },
  ],
}

import { POSTAL_CODE } from '../constants'

export default {
  postalCodeFrom: POSTAL_CODE,
  fields: [
    {
      name: 'postalCode',
      label: 'postalCode',
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
}

import { POSTAL_CODE } from '../constants'

export default {
  postalCodeFrom: POSTAL_CODE,
  fields: [
    {
      field: 'postalCode',
      label: 'postalCode',
      size: 'small',
    },
    {
      field: 'street',
      label: 'addressLine1',
      required: true,
      size: 'xlarge',
    },
    {
      field: 'complement',
      label: 'addressLine2',
      size: 'xlarge',
    },
    {
      field: 'city',
      label: 'city',
      required: true,
      size: 'large',
    },
    {
      field: 'state',
      label: 'state',
      required: true,
      size: 'large',
      isUpperCase: false,
    },
  ],
}

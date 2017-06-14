import { POSTAL_CODE } from '../constants'

export default {
  postalCodeFrom: POSTAL_CODE,
  fields: [
    {
      field: 'postalCode',
      label: 'postalCode',
      required: true,
      mask: '9999',
      regex: '^([\\d]{4})$',
      postalCodeAPI: true,
      forgottenURL: 'http://www.correoargentino.com.ar/formularios/cpa',
      size: 'small',
    },
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
      field: 'city',
      label: 'city',
      required: true,
      size: 'large',
    },
    {
      field: 'state',
      label: 'province',
      required: true,
      size: 'large',
      isUpperCase: false,
    },
  ],
}

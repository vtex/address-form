import { POSTAL_CODE } from '../constants'

export default {
  postalCodeFrom: POSTAL_CODE,
  fields: [
    {
      name: 'postalCode',
      label: 'postalCode',
      required: true,
      mask: '9999',
      regex: '^([\\d]{4})$',
      postalCodeAPI: true,
      forgottenURL: 'http://www.correoargentino.com.ar/formularios/cpa',
      size: 'small',
    },
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
      name: 'city',
      label: 'city',
      required: true,
      size: 'large',
    },
    {
      name: 'state',
      label: 'province',
      required: true,
      size: 'large',
      isUpperCase: false,
    },
  ],
}

import { POSTAL_CODE } from '../constants'

export default {
  postalCodeFrom: POSTAL_CODE,
  fields: [
    {
      field: 'postalCode',
      label: 'postalCode',
      required: true,
      mask: '99999',
      regex: '^([\\d]{5})$',
      forgottenURL: 'http://geo.correo.com.uy/IsisBusquedaDireccionPlugin/cp.jsp',
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
      field: 'state',
      label: 'department',
      required: true,
      size: 'large',
      isUpperCase: false,
    },
    {
      field: 'city',
      label: 'locality',
      required: true,
      size: 'large',
    },
  ],
}

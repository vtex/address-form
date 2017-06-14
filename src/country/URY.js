import { POSTAL_CODE } from '../constants'

export default {
  postalCodeFrom: POSTAL_CODE,
  fields: [
    {
      name: 'postalCode',
      label: 'postalCode',
      required: true,
      mask: '99999',
      regex: '^([\\d]{5})$',
      forgottenURL: 'http://geo.correo.com.uy/IsisBusquedaDireccionPlugin/cp.jsp',
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
      name: 'state',
      label: 'department',
      required: true,
      size: 'large',
      isUpperCase: false,
    },
    {
      name: 'city',
      label: 'locality',
      required: true,
      size: 'large',
    },
  ],
}

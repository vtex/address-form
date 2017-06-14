import { POSTAL_CODE } from '../constants'

export default {
  postalCodeFrom: POSTAL_CODE,
  fields: [
    {
      name: 'postalCode',
      required: true,
      mask: '9999-999',
      regex: '^(?:[\\d]{4})(?:\\-|)(?:[\\d]{3}|)$',
      forgottenURL: 'https://www.ctt.pt/feapl_2/app/open/objectSearch/objectSearch.jspx',
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

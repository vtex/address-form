import { POSTAL_CODE } from '../constants'

export default {
  postalCodeFrom: POSTAL_CODE,
  fields: [
    {
      field: 'postalCode',
      label: 'postalCode',
      required: true,
      mask: 'A9A 9A9',
      regex: '^[A-z][0-9][A-z]\\ ?[0-9][A-z][0-9]$',
      postalCodeAPI: true,
      forgottenURL: 'https://www.canadapost.ca/cpo/mc/personal/postalcode/fpc.jsf',
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
      label: 'province',
      required: true,
      size: 'large',
      isUpperCase: true,
      optionsPairs: [
        { label: 'Alberta', value: 'AB' },
        { label: 'British Columbia', value: 'BC' },
        { label: 'Manitoba', value: 'MB' },
        { label: 'New Brunswick', value: 'NB' },
        { label: 'Newfoundland and Labrador', value: 'NL' },
        { label: 'Northwest Territories', value: 'NT' },
        { label: 'Nova Scotia', value: 'NS' },
        { label: 'Nunavut', value: 'NV' },
        { label: 'Ontario', value: 'ON' },
        { label: 'Prince Edward Island', value: 'PE' },
        { label: 'Quebec', value: 'QC' },
        { label: 'Saskatchewan', value: 'SK' },
        { label: 'Yukon', value: 'YK' },
      ],
    },
    {
      field: 'number',
      label: 'number',
      visible: false,
      defaultValue: 'N/A',
    },
  ],
}

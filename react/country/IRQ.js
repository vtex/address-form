import { POSTAL_CODE } from '../constants'

export default {
  country: 'IRQ',
  abbr: 'IQ',
  postalCodeFrom: POSTAL_CODE,
  fields: [
    {
      hidden: true,
      name: 'country',
      maxLength: 100,
      label: 'country',
      size: 'medium',
    },
    {
      name: 'postalCode',
      maxLength: 50,
      fixedLabel: 'ص. ب.',
      required: true,
      mask: '99999',
      regex: '^([\\d]{5})$',
      size: 'small',
      autoComplete: 'nope',
      postalCodeAPI: false,
    },
    {
      name: 'street',
      label: 'street',
      required: true,
      size: 'xlarge',
    },
    {
      name: 'number',
      maxLength: 750,
      label: 'number',
      required: true,
      size: 'small',
      autoComplete: 'nope',
    },
    {
      name: 'complement',
      maxLength: 750,
      label: 'complement',
      size: 'large',
    },
    {
      hidden: true,
      name: 'reference',
      maxLength: 750,
      label: 'reference',
      size: 'xlarge',
    },
    {
      hidden: true,
      name: 'neighborhood',
      maxLength: 100,
      label: 'neighborhood',
      size: 'large',
    },
    {
      name: 'city',
      maxLength: 100,
      label: 'city',
      required: true,
      size: 'large',
    },
    {
      name: 'region',
      maxLength: 100,
      label: 'region',
      required: true,
      size: 'large',
    },
    {
      name: 'receiverName',
      elementName: 'receiver',
      maxLength: 750,
      label: 'receiverName',
      size: 'xlarge',
      required: true,
    },
  ],
  summary: [
    [
      { name: 'street' },
      { delimiter: '+', name: 'number' },
      { delimiter: ', ', name: 'complement' },
    ],
    [
      { name: 'city' },
      { delimiter: ' , ', name: 'state' },
    ],
    [
      { name: 'postalCode' },
    ],
  ],
}

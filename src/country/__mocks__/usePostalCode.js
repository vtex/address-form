import { POSTAL_CODE } from '../../constants'

export default {
  country: 'BRA',
  abbr: 'BR',
  postalCodeFrom: POSTAL_CODE,
  fields: [
    {
      name: 'postalCode',
      maxLength: 50,
      fixedLabel: 'CEP',
      required: true,
      mask: '99999-999',
      regex: '^([\\d]{5})\\-?([\\d]{3})$',
      postalCodeAPI: true,
      forgottenURL:
        'http://www.buscacep.correios.com.br/servicos/dnec/index.do',
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
      maxLength: 750,
      label: 'number',
      required: true,
      size: 'mini',
    },
    {
      name: 'complement',
      maxLength: 750,
      label: 'complement',
      size: 'large',
    },
    {
      name: 'neighborhood',
      maxLength: 100,
      label: 'neighborhood',
      required: true,
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
      maxLength: 100,
      label: 'state',
      required: true,
      optionsCaption: 'UF',
      optionsPairs: [
        { value: 'AC', label: 'Acre' },
        { value: 'AL', label: 'Alagoas' },
        { value: 'AP', label: 'Amapá' },
        { value: 'RJ', label: 'Rio de Janeiro' },
      ],
      size: 'mini',
    },
    {
      name: 'receiverName',
      maxLength: 750,
      label: 'receiverName',
      size: 'large',
      required: true,
    },
  ],
  geolocation: {
    postalCode: {
      valueIn: 'long_name',
      types: ['postal_code'],
      required: false,
    },
    number: {
      valueIn: 'long_name',
      types: ['street_number'],
      required: false,
    },
    street: {
      valueIn: 'long_name',
      types: ['route'],
      required: false,
    },
    neighborhood: {
      valueIn: 'long_name',
      types: [
        'neighborhood',
        'sublocality_level_1',
        'sublocality_level_2',
        'sublocality_level_3',
        'sublocality_level_4',
        'sublocality_level_5',
      ],
      required: false,
    },
    state: {
      valueIn: 'short_name',
      types: ['administrative_area_level_1'],
      required: false,
    },
    city: {
      valueIn: 'long_name',
      types: ['administrative_area_level_2', 'locality'],
      required: false,
    },
  },
  summary: [
    [
      {
        name: 'street',
      },
      {
        delimiter: ' ',
        name: 'number',
      },
      {
        delimiter: ', ',
        name: 'complement',
      },
    ],
    [
      {
        name: 'neighborhood',
      },
      {
        delimiter: ' - ',
        name: 'city',
      },
      {
        delimiter: ' - ',
        name: 'state',
      },
    ],
    [
      {
        name: 'postalCode',
      },
    ],
  ],
}

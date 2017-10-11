import { POSTAL_CODE } from '../constants'

export default {
  country: 'BRA',
  abbr: 'BR',
  postalCodeFrom: POSTAL_CODE,
  postalCodeProtectedFields: ['state', 'city'],
  fields: [
    {
      hidden: true,
      name: 'country',
      label: 'country',
      size: 'medium',
    },
    {
      name: 'postalCode',
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
      name: 'neighborhood',
      label: 'neighborhood',
      required: true,
      size: 'large',
    },
    {
      hidden: true,
      name: 'reference',
      label: 'reference',
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
      size: 'mini',
      optionsCaption: 'UF',
      options: ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'],
    },
    {
      name: 'receiverName',
      label: 'receiverName',
      size: 'xlarge',
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
}

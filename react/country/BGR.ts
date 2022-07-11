import { POSTAL_CODE } from '../constants'
import type { PostalCodeRules } from '../types/rules'

const rules: PostalCodeRules = {
  country: 'BGR',
  abbr: 'BG',
  postalCodeFrom: POSTAL_CODE,
  postalCodeProtectedFields: ['state'],
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
      maxLength: 4,
      label: 'postalCode',
      required: true,
      mask: '9999',
      regex: /^[1-9]\d{3}$/, // 4 digits, no leading zero.
      postalCodeAPI: true,
      size: 'small',
      autoComplete: 'nope',
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
      autoComplete: 'nope',
    },
    {
      name: 'complement',
      maxLength: 750,
      label: 'floorAndLetter',
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
      name: 'state',
      maxLength: 100,
      label: 'province',
      required: true,
      optionsCaption: '',
      options: [
        'Област Благоевград',
        'Област Бургас',
        'Област Варна',
        'Област Велико Търново',
        'Област Видин',
        'Област Враца',
        'Област Габрово',
        'Област Добрич',
        'Област Кърджали',
        'Област Кюстендил',
        'Област Ловеч',
        'Област Монтана',
        'Област Пазарджик',
        'Област Перник',
        'Област Плевен',
        'Област Пловдив',
        'Област Разград',
        'Област Русе',
        'Област Силистра',
        'Област Сливен',
        'Област Смолян',
        'Софийска област',
        'Област София',
        'Област Стара Загора',
        'Област Търговище',
        'Област Хасково',
        'Област Шумен',
        'Област Ямбол',
      ],
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
  geolocation: {
    postalCode: {
      valueIn: 'long_name',
      types: ['postal_code'],
    },

    number: {
      valueIn: 'long_name',
      types: ['street_number'],
      required: true,
      notApplicable: true,
    },

    street: { valueIn: 'long_name', types: ['route'] },

    neighborhood: {
      valueIn: 'long_name',
      types: ['neighborhood'],
    },

    state: {
      valueIn: 'long_name',
      types: ['administrative_area_level_1'],
    },

    city: {
      valueIn: 'long_name',
      types: ['administrative_area_level_2', 'locality'],
    },

    receiverName: {
      required: true,
    },
  },
  summary: [
    [
      { name: 'street' },
      { delimiter: ' ', name: 'number' },
      { delimiter: ' ', name: 'complement' },
    ],
    [
      { name: 'postalCode' },
      { delimiter: ' ', name: 'city' },
      { delimiter: ' (', name: 'state', delimiterAfter: ')' },
    ],
  ],
}

export default rules

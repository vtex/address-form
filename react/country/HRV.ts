import { POSTAL_CODE } from '../constants'
import type { PostalCodeRules } from '../types/rules'

const rules: PostalCodeRules = {
  country: 'HRV',
  abbr: 'HR',
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
      maxLength: 5,
      label: 'postalCode',
      required: true,
      mask: '99999',
      regex: /^(10|20|21|22|23|31|32|33|34|35|40|42|43|44|47|48|49|51|52|53)\d{3}$/,
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
        'Zagrebačka županija',
        'Krapinsko-zagorska županija',
        'Sisačko-moslavačka županija',
        'Karlovačka županija',
        'Varaždinska županija',
        'Koprivničko-križevačka županija',
        'Bjelovarsko-bilogorska županija',
        'Primorsko-goranska županija',
        'Ličko-senjska županija',
        'Virovitičko-podravska županija',
        'Požeško-slavonska županija',
        'Brodsko-posavska županija',
        'Zadarska županija',
        'Osječko-baranjska županija',
        'Šibensko-kninska županija',
        'Vukovarsko-srijemska županija',
        'Splitsko-dalmatinska županija',
        'Istarska županija',
        'Dubrovačko-neretvanska županija',
        'Međimurska županija',
        'Grad Zagreb',
      ],
      size: 'large',
    },
    {
      hidden: true,
      name: 'receiverName',
      elementName: 'receiver',
      maxLength: 750,
      label: 'receiverName',
      size: 'xlarge',
      required: false,
    },
    {
      hidden: true,
      name: 'contactId',
      maxLength: 100,
      label: 'contactId',
      size: 'xlarge',
      required: false,
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

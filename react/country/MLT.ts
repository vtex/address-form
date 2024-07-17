import { POSTAL_CODE } from '../constants'
import type { PostalCodeRules } from '../types/rules'

const rules: PostalCodeRules = {
  country: 'MLT',
  abbr: 'MT',
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
      maxLength: 8,
      fixedLabel: 'Post code',
      required: true,
      mask: 'AAA 999',
      regex: '^[a-zA-Z]{2,3}\\ ?\\d{4}$',
      postalCodeAPI: false,
      size: 'small',
      autoComplete: 'nope',
      autoUpperCase: true,
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
      hidden: true,
      name: 'reference',
      maxLength: 750,
      label: 'reference',
      size: 'xlarge',
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
      label: 'state',
      required: true,
      size: 'mini', // Talvez precise aumentar.
      optionsCaption: 'Council',
      options: [
        'Attard (Attard)',
        'Balzan (Balzan)',
        'Birkirkara (Birkirkara)',
        'Birżebbuġa (Birzebbuga)',
        'Cospicua (Cospicua)',
        'Dingli (Dingli)',
        'Fgura (Fgura)',
        'Floriana (Floriana)',
        'Fontana (Fontana)',
        'Għajnsielem (Ghajnsielem)',
        'Għarb (Gharb)',
        'Għargħur (Gharghur)',
        'Għasri (Ghasri)',
        'Għaxaq (Ghaxaq)',
        'Gudja (Gudja)',
        'Gżira (Gzira)',
        'Ħamrun (Hamrun)',
        'Iklin (Iklin)',
        'Kalkara (Kalkara)',
        'Kercem (Kercem)',
        'Kirkop (Kirkop)',
        'Lija (Lija)',
        'Luqa (Luqa)',
        'Marsa (Marsa)',
        'Marsaskala (Marsaskala)',
        'Marsaxlokk (Marsaxlokk)',
        'Mdina (Mdina)',
        'Mellieha (Mellieha)',
        'Mgarr (Mgarr)',
        'Mosta (Mosta)',
        'Mqabba (Mqabba)',
        'Msida (Msida)',
        'Mtarfa (Imtarfa)',
        'Munxar (Munxar)',
        'Nadur (Nadur)',
        'Naxxar (Naxxar)',
        'Paola (Paola)',
        'Pembroke (Pembroke)',
        'Pietà (Pietà)',
        'Qala (Qala)',
        'Qormi (Qormi)',
        'Qrendi (Qrendi)',
        'Rabat (Rabat)',
        'Safi (Safi)',
        "St. Julian’s (St. Julian's)",
        'San Gwann (San gwann)',
        'San Lawrenz (San Lawrenz)',
        'Senglea (Senglea)',
        "St. Paul’s Bay (St. Paul's Bay)",
        'Sannat (Sannat)',
        'Santa Lucija (Santa Lucija)',
        'Santa Venera (Santa Venera)',
        'Siggiewi (Siggiewi)',
        'Sliema (Sliema)',
        'Swieqi (Swieqi)',
        'Tarxien (Tarxien)',
        "Ta' Xbiex (Ta' Xbiex)",
        'Valletta (Valletta)',
        'Victoria (Victoria-Gozo)',
        'Vittoriosa (Birgu)',
        'Xaghra (Xaghra)',
        'Xewkija (Xewkija)',
        'Xghajra (Xaghjra)',
        'Zabbar (Zabbar)',
        'Żebbuġ (Zebbug)',
        'Zebbug (Zebbug-Gozo)',
        'Zejtun (Zejtun)',
        'Zurrieq (Zurrieq)',
      ],
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
      required: false,
    },

    number: {
      valueIn: 'long_name',
      types: ['street_number'],
      required: true,
      notApplicable: true,
    },

    street: {
      valueIn: 'long_name',
      types: ['route'],
      handler: (address, googleAddress) => {
        address.street = { value: (googleAddress as { name: string }).name }

        return address
      },
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
    },

    state: {
      valueIn: 'short_name',
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
      { name: 'complement' },
      { delimiter: ' ', name: 'street' },
      { delimiter: ', ', name: 'neighborhood' },
    ],
    [
      { name: 'city' },
      { delimiter: ', ', name: 'state' },
      { delimiter: ' ', name: 'postalCode' },
    ],
  ],
}

export default rules

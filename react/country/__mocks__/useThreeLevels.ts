import { THREE_LEVELS } from '../../constants'
import { thirdLevelPostalCodes } from '../../transforms/postalCodes'
import {
  getOneLevel,
  getTwoLevels,
  getThreeLevels,
} from '../../transforms/addressFieldsOptions'
import type { PostalCodeRules } from '../../types/rules'
import {
  mockComplementField,
  mockNumberField,
  mockReceiverNameField,
  mockStreetField,
} from './sharedMockRuleFields'

const countryData = {
  Beni: {
    Cercado: {
      Paititi: '10000',
      Trinidad: '10001',
      Yucumo: '10002',
    },
    Mamore: {
      'San Ramon': '10200',
    },
  },
  Cochabamba: {
    Arani: {
      Arani: '30000',
      Vacas: '30001',
    },
    Chapare: {
      Colomi: '30500',
      Epizana: '30501',
      Eterazama: '30502',
    },
  },
}

const rules: PostalCodeRules = {
  country: 'BOL',
  abbr: 'BO',
  postalCodeFrom: THREE_LEVELS,
  postalCodeLevels: ['state', 'city', 'neighborhood'],
  thirdLevelPostalCodes: thirdLevelPostalCodes(countryData),
  fields: [
    mockStreetField,
    mockNumberField,
    mockComplementField,
    {
      name: 'state',
      maxLength: 100,
      label: 'department',
      required: true,
      size: 'large',
      level: 1,
      options: getOneLevel(countryData),
    },
    {
      name: 'city',
      label: 'province',
      required: true,
      size: 'large',
      level: 2,
      basedOn: 'state',
      optionsMap: getTwoLevels(countryData),
    },
    {
      name: 'neighborhood',
      maxLength: 100,
      label: 'city',
      required: true,
      level: 3,
      basedOn: 'city',
      optionsMap: getThreeLevels(countryData),
    },
    mockReceiverNameField,
  ],
}

export default rules

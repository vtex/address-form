import { TWO_LEVELS, THREE_LEVELS } from '../../constants'
import {
  secondLevelPostalCodes,
  thirdLevelPostalCodes,
} from '../../transforms/postalCodes'
import {
  getOneLevel,
  getTwoLevels,
  getThreeLevels,
} from '../../transforms/addressFieldsOptions'

const twoLevelCountryData = {
  Itapúa: {
    Encarnación: '6000',
  },
}

export const accentInsensitiveTwoLevelsRules = {
  country: 'MOCK',
  abbr: 'MK',
  postalCodeFrom: TWO_LEVELS,
  postalCodeLevels: ['state', 'city'],
  secondLevelPostalCodes: secondLevelPostalCodes(twoLevelCountryData),
  fields: [
    {
      name: 'state',
      label: 'department',
      required: true,
      size: 'large',
      options: getOneLevel(twoLevelCountryData),
    },
    {
      name: 'city',
      label: 'city',
      required: true,
      size: 'large',
      level: 2,
      basedOn: 'state',
      optionsMap: getTwoLevels(twoLevelCountryData),
    },
  ],
}

export const accentInsensitiveValidationRules = {
  country: 'MOCK',
  abbr: 'MK',
  fields: [
    {
      name: 'state',
      label: 'department',
      required: true,
      level: 1,
      options: getOneLevel(twoLevelCountryData),
    },
    {
      name: 'city',
      label: 'city',
      required: true,
      level: 2,
      basedOn: 'state',
      optionsMap: getTwoLevels(twoLevelCountryData),
    },
  ],
}

const threeLevelCountryData = {
  Cusco: {
    'La Convención': {
      Urubamba: '100',
      Calca: '101',
    },
  },
}

export const accentInsensitiveThreeLevelsRules = {
  country: 'MOCK',
  abbr: 'MK',
  postalCodeFrom: THREE_LEVELS,
  postalCodeLevels: ['state', 'city', 'neighborhood'],
  thirdLevelPostalCodes: thirdLevelPostalCodes(threeLevelCountryData),
  fields: [
    {
      name: 'state',
      label: 'department',
      required: true,
      size: 'large',
      level: 1,
      options: getOneLevel(threeLevelCountryData),
    },
    {
      name: 'city',
      label: 'province',
      required: true,
      size: 'large',
      level: 2,
      basedOn: 'state',
      optionsMap: getTwoLevels(threeLevelCountryData),
    },
    {
      name: 'neighborhood',
      label: 'city',
      required: true,
      size: 'large',
      level: 3,
      basedOn: 'city',
      optionsMap: getThreeLevels(threeLevelCountryData),
    },
  ],
}

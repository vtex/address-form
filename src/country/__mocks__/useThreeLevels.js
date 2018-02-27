import { THREE_LEVELS } from '../../constants'
import { thirdLevelPostalCodes } from '../../transforms/postalCodes'
import {
  getOneLevel,
  getTwoLevels,
  getThreeLevels,
} from '../../transforms/addressFieldsOptions.js'

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

export default {
  postalCodeFrom: THREE_LEVELS,
  postalCodeLevels: ['state', 'city', 'neighborhood'],
  thirdLevelPostalCodes: thirdLevelPostalCodes(countryData),
  fields: [
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
    {
      name: 'receiverName',
      maxLength: 750,
      label: 'receiverName',
      size: 'large',
      required: true,
    },
  ],
}

import { TWO_LEVELS } from '../../constants'
import { secondLevelPostalCodes } from '../../transforms/postalCodes'
import {
  getOneLevel,
  getTwoLevels,
} from '../../transforms/addressFieldsOptions'

const countryData = {
  'I Región': {
    Camiña: '1150000',
    Colchane: '1160000',
    Huara: '1140000',
    Iquique: '1100000',
    Pica: '1170000',
  },
  'II Región': {
    Antofagasta: '1240000',
    Calama: '1390000',
  },
}

export default {
  postalCodeFrom: TWO_LEVELS,
  postalCodeLevels: ['state', 'neighborhood'],
  secondLevelPostalCodes: secondLevelPostalCodes(countryData),
  fields: [
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
      name: 'state',
      label: 'region',
      required: true,
      size: 'large',
      isUpperCase: false,
      options: getOneLevel(countryData),
    },
    {
      name: 'neighborhood',
      label: 'community',
      required: true,
      size: 'large',
      level: 2,
      basedOn: 'state',
      optionsMap: getTwoLevels(countryData),
    },
  ],
}

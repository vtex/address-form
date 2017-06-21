import { ONE_LEVEL } from '../../constants'
import { firstLevelPostalCodes } from '../../transforms/postalCodes'
import {
  getOneLevel,
  getTwoLevels,
} from '../../transforms/addressFieldsOptions'

const countryData = {
  Azuay: {
    Oña: '0000',
    Paute: '0000',
    Pucara: '0000',
  },
  Bolivar: {
    Caluma: '0001',
    Chillanes: '0001',
  },
}

export default {
  postalCodeFrom: ONE_LEVEL,
  postalCodeLevel: 'state',
  firstLevelPostalCodes: firstLevelPostalCodes(countryData),
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
      label: 'province',
      required: true,
      size: 'large',
      isUpperCase: false,
      options: getOneLevel(countryData),
    },
    {
      name: 'city',
      label: 'city',
      required: true,
      size: 'large',
      basedOn: 'state',
      optionsMap: getTwoLevels(countryData),
    },
  ],
}

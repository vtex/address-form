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
  country: 'ECU',
  abbr: 'EC',
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
  geolocation: {
    postalCode: {
      valueIn: 'long_name',
      types: ['postal_code'],
      required: false,
      handler: address => {
        if (
          !address.state ||
          !address.city ||
          !address.state.value ||
          !address.city.value
        ) {
          return address
        }

        if (
          countryData[address.state.value] &&
          countryData[address.state.value][address.city.value]
        ) {
          address.postalCode = {
            value: countryData[address.state.value][address.city.value],
          }
        }

        return address
      },
    },
    number: { valueIn: 'long_name', types: ['street_number'], required: false },
    street: { valueIn: 'long_name', types: ['route'], required: false },
    state: {
      valueIn: 'long_name',
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

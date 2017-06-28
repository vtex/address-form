import { THREE_LEVELS } from '../constants'

export default {
  country: 'PER',
  abbr: 'PE',
  postalCodeFrom: THREE_LEVELS,
  postalCodeLevels: ['state', 'city', 'neighborhood'],
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
      label: 'department',
      required: true,
      size: 'large',
      isUpperCase: false,
    },
    {
      name: 'city',
      label: 'province',
      required: true,
      size: 'large',
    },
    {
      name: 'neighborhood',
      label: 'district',
      required: true,
      size: 'large',
    },
  ],
  geolocation: {
    postalCode: {
      valueIn: 'long_name',
      types: ['postal_code'],
      required: true,
      handler: address => {
        if (!address.state || !address.city || !address.neighborhood) { return address }

        if (
          countryData[address.state.value] &&
          countryData[address.state.value][address.city.value] &&
          countryData[address.state.value][address.city.value][address.neighborhood.value]
        ) {
          address.postalCode = {
            value: countryData[address.state.value][address.city.value][address.neighborhood.value],
          }
        }

        return address
      },
    },
    number: { valueIn: 'long_name', types: ['street_number'], required: false },
    street: { valueIn: 'long_name', types: ['route'], required: false },
    neighborhood: {
      valueIn: 'long_name',
      types: ['neighborhood'],
      required: false,
      handler: (address) => {
        if (
          address.city &&
          (address.city.value === 'Provincia de Lima' ||
            address.city.value === 'Lima')
        ) {
          address.neighborhood = { value: 'Lima' }
          return address
        }

        return address
      },
    },
    state: {
      valueIn: 'long_name',
      types: ['administrative_area_level_1', 'locality'],
      required: false,
      handler: (address) => {
        if (!address.city || !address.state) {
          return address
        }

        if (address.state && address.state.value === 'Distrito de Lima') {
          address.state.value = 'Lima'
          return address
        }

        if (address.state && address.state.value === 'Lima') {
          return address
        }

        const states = Object.keys(countryData)
        for (let i = 0; i < states.length; i++) {
          const state = states[i]
          const cities = Object.keys(countryData[state])
          const hasCity = cities.indexOf(address.city.value) !== -1
          if (hasCity) {
            address.state = { value: state }
            return address
          }
        }

        return address
      },
    },
    city: {
      valueIn: 'long_name',
      types: ['administrative_area_level_2'],
      required: false,
      handler: (address) => {
        if (address.city && address.city.value === 'Provincia de Lima') {
          address.city.value = 'Lima'
        }
        return address
      },
    },
  },
}

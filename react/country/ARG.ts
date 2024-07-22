import { getOneLevel, getTwoLevels } from '../transforms/addressFieldsOptions'
import { POSTAL_CODE } from '../constants'
import type { PostalCodeRules } from '../types/rules'
import countryData from './data/ARG.json'

const isCABA = (googleAddress) =>
  !!googleAddress?.address_components?.find(
    (component) => component.short_name === 'CABA'
  )

/**
 * This is needed to normalize the values for state returned by GMaps
 */

const mappedStates = {
  'ciudad autonoma de buenos aires': 'Ciudad Autónoma de Buenos Aires',
  'gran buenos aires': 'Ciudad Autónoma de Buenos Aires',
  'provincia de buenos aires': 'Buenos Aires',
  'santa fe': 'Santa Fé',
}

const rules: PostalCodeRules = {
  country: 'ARG',
  abbr: 'AR',
  postalCodeFrom: POSTAL_CODE,
  fields: [
    {
      hidden: true,
      name: 'country',
      maxLength: 100,
      label: 'country',
      size: 'medium',
      required: true,
    },
    {
      name: 'postalCode',
      maxLength: 50,
      label: 'postalCode',
      required: true,
      mask: '9999',
      regex: '^([\\d]{4})$',
      postalCodeAPI: true,
      forgottenURL: 'http://www.correoargentino.com.ar/formularios/cpa',
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
      label: 'complement',
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
      name: 'state',
      maxLength: 100,
      label: 'province',
      required: true,
      size: 'large',
      level: 1,
      options: getOneLevel(countryData),
    },
    {
      name: 'city',
      maxLength: 100,
      label: 'city',
      required: true,
      size: 'large',
      level: 2,
      basedOn: 'state',
      optionsMap: getTwoLevels(countryData),
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
      handler: (address) => {
        return {
          ...address,
          postalCode: {
            ...address.postalCode,
            value:
              address.postalCode?.value?.replace(
                /(?:[a-zA-Z]*)(\d+)(?:[a-zA-Z]*)/,
                '$1'
              ) ?? '',
          },
        }
      },
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
      types: [
        'neighborhood',
        'sublocality_level_1',
        'sublocality_level_2',
        'sublocality_level_3',
        'sublocality_level_4',
        'sublocality_level_5',
        'locality',
      ],
    },
    state: {
      valueIn: 'long_name',
      types: ['administrative_area_level_1'],
      handler: (address, googleAddress) => {
        if (isCABA(googleAddress)) {
          address.state = { value: 'Ciudad Autónoma de Buenos Aires' }

          return address
        }

        const stateValue = address?.state.value?.toLowerCase()

        if (stateValue && stateValue in mappedStates) {
          address.state = {
            value: mappedStates[stateValue],
          }

          return address
        }

        return address
      },
    },
    city: {
      valueIn: 'long_name',
      types: ['administrative_area_level_2', 'locality'],
      handler: (address, googleAddress) => {
        if (isCABA(googleAddress)) {
          address.city = { value: 'Ciudad Autónoma de Buenos Aires' }

          return address
        }

        return address
      },
    },
    receiverName: {
      required: true,
    },
  },
  summary: [
    [{ name: 'street' }, { delimiter: ' ', name: 'number' }],
    [{ name: 'complement' }],
    [{ name: 'postalCode' }],
    [
      { name: 'neighborhood', delimiterAfter: ' - ' },
      { name: 'city' },
      { delimiter: ', ', name: 'state' },
    ],
  ],
}

export default rules

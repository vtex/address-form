import { POSTAL_CODE } from '../constants'
import type { PostalCodeRules } from '../types/rules'

const rules: PostalCodeRules = {
  country: 'FRA',
  abbr: 'FR',
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
      label: 'postalCode',
      maxLength: 50,
      required: true,
      mask: '99999',
      regex: '^([\\d]{5})$',
      postalCodeAPI: false,
      size: 'small',
      autoComplete: 'nope',
    },
    {
      name: 'street',
      label: 'addressLine1',
      required: true,
      size: 'xlarge',
    },
    {
      hidden: true,
      name: 'number',
      maxLength: 750,
      label: 'number',
      size: 'min',
      autoComplete: 'nope',
    },
    {
      name: 'complement',
      maxLength: 750,
      label: 'addressLine2',
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
      label: 'department',
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

    street: {
      valueIn: 'long_name',
      types: ['route'],
      handler: (address, googleAddress) => {
        address.street = { value: (googleAddress as { name: string }).name }

        return address
      },
    },

    city: {
      valueIn: 'long_name',
      types: ['locality'],
    },

    state: {
      valueIn: 'short_name',
      types: ['administrative_area_level_1'],
    },

    receiverName: {
      required: true,
    },
  },
  summary: [
    [{ name: 'complement' }],
    [{ name: 'street' }],
    [{ name: 'postalCode' }, { delimiter: ' ', name: 'city' }],
  ],
}

export default rules

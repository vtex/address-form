import { POSTAL_CODE } from '../constants'
import type { PostalCodeRules } from '../types/rules'

const rules: PostalCodeRules = {
  country: 'BEL',
  abbr: 'BE',
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
      maxLength: 4,
      required: true,
      mask: '9999',
      regex: /^\d{4}$/,
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
      name: 'number',
      maxLength: 750,
      label: 'number',
      required: false,
      size: 'mini',
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
      size: 'xlarge',
    },
    {
      hidden: true,
      name: 'state',
      maxLength: 100,
      label: 'department',
      required: false,
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
    },

    number: {
      valueIn: 'long_name',
      types: ['street_number'],
      required: false,
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

import type { PostalCodeRules } from '../../types/rules'

const rules: PostalCodeRules = {
  country: 'USA',
  abbr: 'US',
  fields: [],
  summary: [
    [
      {
        name: 'street',
      },
      {
        delimiter: ', ',
        name: 'complement',
      },
    ],
    [
      {
        name: 'city',
      },
      {
        delimiter: ', ',
        name: 'state',
      },
      {
        delimiter: ' ',
        name: 'postalCode',
      },
    ],
  ],
}

export default rules

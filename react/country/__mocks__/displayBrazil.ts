import type { PostalCodeRules } from '../../types/rules'

const rules: PostalCodeRules = {
  country: 'BRA',
  abbr: 'BR',
  fields: [],
  summary: [
    [
      {
        name: 'street',
      },
      {
        delimiter: ' ',
        name: 'number',
      },
      {
        delimiter: ', ',
        name: 'complement',
      },
    ],
    [
      {
        name: 'neighborhood',
      },
      {
        delimiter: ' - ',
        name: 'city',
      },
      {
        delimiter: ' - ',
        name: 'state',
      },
    ],
    [
      {
        name: 'postalCode',
      },
    ],
  ],
}

export default rules

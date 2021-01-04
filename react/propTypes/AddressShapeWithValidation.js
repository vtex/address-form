import PropTypes from 'prop-types'
import reduce from 'lodash/reduce'

import { ERROR_TYPES } from '../constants'
import { Address } from './AddressShape'

export const ValidationType = {
  visited: false,
  valid: PropTypes.bool,
  reason: PropTypes.oneOf(ERROR_TYPES),
}

export const AddressWithValidation = reduce(
  Address,
  (acc, valueType, propName) => {
    acc[propName] = PropTypes.shape({
      ...ValidationType,
      autoCompleted: PropTypes.bool,
      loading: PropTypes.bool,
      disabled: PropTypes.bool,
      value: valueType,
      valueOptions: PropTypes.arrayOf(PropTypes.string),
      notApplicable: PropTypes.bool,
    }).isRequired

    return acc
  },
  {}
)

export default PropTypes.shape(AddressWithValidation)

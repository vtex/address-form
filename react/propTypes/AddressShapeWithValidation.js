import PropTypes from 'prop-types'
import { ERROR_TYPES } from '../constants'
import reduce from 'lodash/reduce'
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
      notApplicableField: PropTypes.bool,
    }).isRequired
    return acc
  },
  {}
)

export default PropTypes.shape(AddressWithValidation)

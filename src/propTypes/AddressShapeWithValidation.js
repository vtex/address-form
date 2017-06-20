import PropTypes from 'prop-types'
import { ERROR_TYPES } from '../constants'
import reduce from 'lodash/reduce'
import AddressShape from './AddressShape'

export const ValidationType = {
  visited: false,
  valid: PropTypes.bool,
  reason: PropTypes.oneOf(ERROR_TYPES),
}

const AddressShapeWithValidation = reduce(
  AddressShape,
  (acc, valueType, propName) => {
    acc[propName] = PropTypes.shape({
      ...ValidationType,
      value: valueType,
    }).isRequired
    return acc
  },
  {}
)

export default AddressShapeWithValidation

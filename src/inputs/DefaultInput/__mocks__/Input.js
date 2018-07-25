import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation from '../../../propTypes/AddressShapeWithValidation'

class MockInput extends Component {
  render() {
    return <div />
  }
}

MockInput.propTypes = {
  field: PropTypes.object.isRequired,
  options: PropTypes.array,
  address: AddressShapeWithValidation,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
}

export default MockInput

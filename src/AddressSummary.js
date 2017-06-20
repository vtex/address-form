import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation from './propTypes/AddressShapeWithValidation'

class AddressSummary extends Component {
  render() {
    return <div />
  }
}

AddressSummary.propTypes = {
  address: PropTypes.shape(AddressShapeWithValidation).isRequired,
}

export default AddressSummary

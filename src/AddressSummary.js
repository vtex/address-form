import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShape from './AddressShape'

class AddressSummary extends Component {
  render() {
    return <div />
  }
}

AddressSummary.propTypes = {
  address: PropTypes.shape(AddressShape).isRequired,
}

export default AddressSummary

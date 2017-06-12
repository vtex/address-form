import React, { Component } from 'react'
import PropTypes from 'prop-types'

class AddressForm extends Component {
  render() {
    return <div />
  }
}

AddressForm.propTypes = {
  country: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
}

export default AddressForm

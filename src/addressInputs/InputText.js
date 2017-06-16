import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShape from '../propTypes/AddressShape'

class InputText extends Component {
  handleChange = e => {
    const value = e.target.value

    this.props.onChange({
      ...this.props.address,
      [this.props.field.name]: value,
    })
  };

  render() {
    const { address, field } = this.props

    return (
      <input
        type="text"
        name={field.name}
        value={address[field.name] || ''}
        onChange={this.handleChange}
      />
    )
  }
}

InputText.propTypes = {
  field: PropTypes.object.isRequired,
  address: PropTypes.shape(AddressShape),
  onChange: PropTypes.func.isRequired,
}

export default InputText

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation
  from '../propTypes/AddressShapeWithValidation'

class InputText extends Component {
  handleChange = e => {
    const { address, field, onChange } = this.props
    const value = e.target.value

    onChange({
      [field.name]: {
        ...address[field.name],
        value,
      },
    })
  };

  handleBlur = e => {
    const { address, field, onChange } = this.props

    onChange({
      [field.name]: {
        ...address[field.name],
        visited: true,
      },
    })
  };

  render() {
    const { address, field } = this.props

    return (
      <input
        type="text"
        name={field.name}
        value={address[field.name].value || ''}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
      />
    )
  }
}

InputText.propTypes = {
  field: PropTypes.object.isRequired,
  address: PropTypes.shape(AddressShapeWithValidation),
  onChange: PropTypes.func.isRequired,
}

export default InputText

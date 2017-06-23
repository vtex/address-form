import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation
  from '../propTypes/AddressShapeWithValidation'
import InputSelect from './InputSelect'
import InputText from './InputText'
import InputLabel from './InputLabel'

class Input extends Component {
  handleChange = value => {
    const { address, field, onChangeAddress } = this.props

    onChangeAddress({
      [field.name]: {
        ...address[field.name],
        autoCompleted: undefined,
        value,
      },
    })
  };

  handleBlur = () => {
    const { address, field, onChangeAddress } = this.props

    onChangeAddress({
      [field.name]: {
        ...address[field.name],
        visited: true,
      },
    })
  };

  render() {
    const { field, options, address } = this.props

    return (
      <InputLabel field={field}>
        {options
          ? <InputSelect
            field={field}
            options={options}
            address={address}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            />
          : <InputText
            field={field}
            address={address}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            />}
      </InputLabel>
    )
  }
}

Input.propTypes = {
  field: PropTypes.object.isRequired,
  options: PropTypes.array,
  address: PropTypes.shape(AddressShapeWithValidation),
  onChangeAddress: PropTypes.func.isRequired,
}

export default Input

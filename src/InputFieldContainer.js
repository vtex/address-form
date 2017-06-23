import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation from './propTypes/AddressShapeWithValidation'
import { getListOfOptions, hasOptions } from './selectors/fields'

class InputFieldContainer extends Component {
  bindOnChange = () => {
    const { field, address, onChangeAddress } = this.props
    return value => {
      onChangeAddress({
        [field.name]: {
          ...address[field.name],
          autoCompleted: undefined,
          value,
        },
      })
    }
  };

  bindOnBlur = () => {
    const { field, address, onChangeAddress } = this.props
    return () => {
      onChangeAddress({
        [field.name]: {
          ...address[field.name],
          visited: true,
        },
      })
    }
  };

  render() {
    const { Input, field, address, options, rules } = this.props

    const _options =
      options ||
      (hasOptions(field) ? getListOfOptions(field, address, rules) : undefined)

    return (
      <Input
        field={field}
        options={_options}
        address={address}
        onChange={this.bindOnChange(field)}
        onBlur={this.bindOnBlur(field)}
      />
    )
  }
}

InputFieldContainer.propTypes = {
  Input: PropTypes.func.isRequired,
  field: PropTypes.object.isRequired,
  address: PropTypes.shape(AddressShapeWithValidation),
  rules: PropTypes.object.isRequired,
  options: PropTypes.array,
  onChangeAddress: PropTypes.func.isRequired,
}

export default InputFieldContainer

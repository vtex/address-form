import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation from './propTypes/AddressShapeWithValidation'
import {
  getListOfOptions,
  hasOptions,
  getDependentFields,
} from './selectors/fields'
import reduce from 'lodash/reduce'

class InputFieldContainer extends Component {
  clearDependentFields(address, dependentFields) {
    if (dependentFields && dependentFields.length === 0) return {}

    return reduce(
      address,
      (cleanAddress, value, prop) => {
        const isDependentField = dependentFields.indexOf(prop) !== -1
        if (isDependentField) {
          cleanAddress[prop] = { value: null }
        }
        return cleanAddress
      },
      {}
    )
  }

  bindOnChange = () => {
    const { field, address, rules, onChangeAddress } = this.props
    const dependentFields = getDependentFields(field.name, rules)

    return value => {
      const clearedFields = this.clearDependentFields(address, dependentFields)

      onChangeAddress({
        ...clearedFields,
        [field.name]: {
          ...address[field.name],
          postalCodeAutoCompleted: undefined,
          geolocationAutoCompleted: undefined,
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
      (hasOptions(field, address)
        ? getListOfOptions(field, address, rules)
        : undefined)

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
  address: AddressShapeWithValidation,
  rules: PropTypes.object.isRequired,
  options: PropTypes.array,
  onChangeAddress: PropTypes.func.isRequired,
}

export default InputFieldContainer

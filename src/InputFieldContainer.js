import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation from './propTypes/AddressShapeWithValidation'
import {
  getListOfOptions,
  hasOptions,
  getDependentFields,
} from './selectors/fields'
import reduce from 'lodash/reduce'
import msk from 'msk'

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
  }

  bindOnBlur = () => {
    const { field, address, onChangeAddress } = this.props
    const value = address[field.name] ? address[field.name].value : ''

    const maskedValue = field.mask ? msk(value, field.mask) : value

    return () => {
      onChangeAddress({
        [field.name]: {
          ...address[field.name],
          value: maskedValue,
          visited: true,
        },
      })
    }
  }

  inputRef = el => {
    this.el = el
  }

  componentDidMount() {
    this.addFocusIfNeeded()
  }

  componentDidUpdate() {
    this.addFocusIfNeeded()
  }

  addFocusIfNeeded() {
    const { address, field, onChangeAddress } = this.props

    const fieldValue = address[field.name]
    if (this.el && fieldValue.focus) {
      this.el.focus()
      onChangeAddress({
        [field.name]: {
          ...fieldValue,
          focus: undefined,
        },
      })
    }
  }

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
        inputRef={this.inputRef}
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

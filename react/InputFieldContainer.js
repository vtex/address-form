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
import pureInputField from './pureInputField'

class InputFieldContainer extends Component {
  clearDependentFields(address, dependentFields) {
    if (dependentFields && dependentFields.length === 0) return {}

    return reduce(
      address,
      (cleanAddress, addressField, prop) => {
        const isDependentField = dependentFields.indexOf(prop) !== -1
        return isDependentField
          ? {
            ...cleanAddress,
            [prop]: {
              valueOptions: addressField.valueOptions,
              value: null,
            },
          }
          : cleanAddress
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

  bindNotApplicable = () => {
    const { address, onChangeAddress, intl } = this.props
    return () => {
      onChangeAddress({
        'number': {
          ...address['number'],
          value: !address['number'].disabled
            ? 'N/A' : '',
          disabled: !address['number'].disabled,
        },
      })
    }
  }

  bindOnBlur = () => {
    const { field, address, onChangeAddress } = this.props
    const value = address[field.name] ? address[field.name].value : ''

    const maskedValue = field.mask ? msk(value, field.mask) : value

    const isPostalCode = field.name === 'postalCode'

    return () => {
      if (isPostalCode && !value) return

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
    if (this.el && typeof this.el.focus === 'function' && fieldValue.focus) {
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
    const {
      Input,
      field,
      autoFocus,
      address,
      options,
      rules,
      shouldShowNumberKeyboard,
      onNumberInputFocus,
    } = this.props

    const _options =
      options ||
      (hasOptions(field, address)
        ? getListOfOptions(field, address, rules)
        : undefined)
    const fieldValue = address[field.name].value
    const fieldDisable = address[field.name].disabled

    return (
      <Input
        address={address}
        field={field}
        autoFocus={autoFocus}
        options={_options}
        onChange={this.bindOnChange()}
        onBlur={this.bindOnBlur()}
        {...(address[field.name].canBeOmitted
          ? { toggleNotApplicable: this.bindNotApplicable() }
          : {}
        )}
        inputRef={this.inputRef}
        shouldShowNumberKeyboard={shouldShowNumberKeyboard}
        disabled={fieldDisable}
        value={fieldValue}
        onFocus={onNumberInputFocus}
      />
    )
  }
}

InputFieldContainer.propTypes = {
  autoFocus: false,
  shouldShowNumberKeyboard: false,
}

InputFieldContainer.propTypes = {
  Input: PropTypes.func.isRequired,
  autoFocus: PropTypes.bool,
  field: PropTypes.object.isRequired,
  address: AddressShapeWithValidation,
  rules: PropTypes.object.isRequired,
  options: PropTypes.array,
  onChangeAddress: PropTypes.func.isRequired,
  onNumberInputFocus: PropTypes.func,
  shouldShowNumberKeyboard: PropTypes.bool,
}

export default pureInputField(InputFieldContainer)

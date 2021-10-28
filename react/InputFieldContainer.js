import React, { Component } from 'react'
import PropTypes from 'prop-types'
import reduce from 'lodash/reduce'
import msk from 'msk'

import AddressShapeWithValidation from './propTypes/AddressShapeWithValidation'
import {
  getListOfOptions,
  hasOptions,
  getDependentFields,
} from './selectors/fields'
import pureInputField from './pureInputField'
import { addressContextPropTypes } from './addressContainerContext'

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

    return (value) => {
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
    const { address, onChangeAddress, notApplicableLabel } = this.props
    const labelNotApplicable = notApplicableLabel || 'N/A'

    return () => {
      onChangeAddress({
        number: {
          ...address.number,
          value: address.number.disabled ? null : labelNotApplicable,
          disabled: !address.number.disabled,
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

  inputRef = (el) => {
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
      Button,
      loading,
      field,
      autoFocus,
      address,
      options,
      onSubmit,
      submitLabel,
      rules,
      fieldsStyleRules,
      shouldShowNumberKeyboard,
    } = this.props

    const _options =
      options ||
      (hasOptions(field, address)
        ? getListOfOptions(field, address, rules)
        : undefined)

    const notApplicableProps =
      // the right side of the || is for lib consumers without the 'useGeolocation' flag
      // unnecessary for 3.6.0+, but necessary for backward compatibility
      field.notApplicable || address[field.name].notApplicable
        ? {
            toggleNotApplicable: this.bindNotApplicable(),
            notApplicableLabel: this.props.notApplicableLabel,
          }
        : null

    return (
      <Input
        Button={Button}
        address={address}
        fieldsStyleRules={fieldsStyleRules}
        loading={loading}
        field={field}
        autoFocus={autoFocus}
        options={_options}
        onSubmit={onSubmit}
        submitLabel={submitLabel}
        onChange={this.bindOnChange()}
        onBlur={this.bindOnBlur()}
        {...notApplicableProps}
        inputRef={this.inputRef}
        shouldShowNumberKeyboard={shouldShowNumberKeyboard}
      />
    )
  }
}

InputFieldContainer.propTypes = {
  autoFocus: false,
  shouldShowNumberKeyboard: false,
  loading: false,
}

InputFieldContainer.propTypes = {
  ...addressContextPropTypes,
  Button: PropTypes.func,
  Input: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  autoFocus: PropTypes.bool,
  field: PropTypes.object.isRequired,
  address: AddressShapeWithValidation,
  rules: PropTypes.object.isRequired,
  options: PropTypes.array,
  onChangeAddress: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  notApplicableLabel: PropTypes.string,
  shouldShowNumberKeyboard: PropTypes.bool,
  submitLabel: PropTypes.string,
}

export default pureInputField(InputFieldContainer)

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
import type { AddressWithValidation, Fields } from './types/address'
import type { PostalCodeFieldRule, PostalCodeRules } from './types/rules'

const propTypes = {
  Button: PropTypes.elementType,
  Input: PropTypes.elementType.isRequired,
  loading: PropTypes.bool,
  autoFocus: PropTypes.bool,
  field: PropTypes.object.isRequired,
  address: AddressShapeWithValidation,
  rules: PropTypes.object.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired
  ),
  onChangeAddress: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  notApplicableLabel: PropTypes.string,
  shouldShowNumberKeyboard: PropTypes.bool,
  submitLabel: PropTypes.string,
}

class InputFieldContainer extends Component<
  PropTypes.InferProps<typeof propTypes> & {
    field: PostalCodeFieldRule
    address: AddressWithValidation
    rules: PostalCodeRules
    options?: Array<{ value: string; label: string }>
  }
> {
  public static defaultProps = {
    autoFocus: false,
    shouldShowNumberKeyboard: false,
    loading: false,
  }

  public static propTypes = propTypes

  private inputRef = React.createRef<HTMLInputElement>()

  private clearDependentFields(
    address: AddressWithValidation,
    dependentFields: Fields[]
  ) {
    if (dependentFields && dependentFields.length === 0) return {}

    return reduce(
      address,
      (cleanAddress, addressField, prop) => {
        const isDependentField = dependentFields.indexOf(prop as Fields) !== -1

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

  private bindOnChange = () => {
    const { field, address, rules, onChangeAddress } = this.props
    const dependentFields = getDependentFields(field.name, rules)

    return (value: string) => {
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

  private bindNotApplicable = () => {
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

  private bindOnBlur = () => {
    const { field, address, onChangeAddress } = this.props
    const value = address[field.name] ? address[field.name].value : ''

    const maskedValue = field.mask ? msk(value ?? '', field.mask) : value

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

  public componentDidMount() {
    this.addFocusIfNeeded()
  }

  public componentDidUpdate() {
    this.addFocusIfNeeded()
  }

  public addFocusIfNeeded() {
    const { address, field, onChangeAddress } = this.props
    const fieldValue = address[field.name]

    if (
      this.inputRef.current &&
      typeof this.inputRef.current.focus === 'function' &&
      fieldValue.focus
    ) {
      this.inputRef.current.focus()

      onChangeAddress({
        [field.name]: {
          ...fieldValue,
          focus: undefined,
        },
      })
    }
  }

  public render() {
    const {
      Input,
      Button,
      loading,
      field,
      autoFocus,
      address,
      onSubmit,
      submitLabel,
      rules,
      shouldShowNumberKeyboard,
    } = this.props

    let options =
      this.props.options ||
      (hasOptions(field, address)
        ? getListOfOptions(field, address, rules)
        : undefined)

    if (options != null) {
      const addressField = address[field.name]

      if (
        addressField.value != null &&
        !options.find((option) => option.value === addressField.value) &&
        addressField.valid !== false
      ) {
        options = [
          ...options,
          {
            value: addressField.value!,
            label: addressField.value!,
          },
        ]
      }
    }

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
        loading={loading}
        field={field}
        autoFocus={autoFocus}
        options={options}
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

export default pureInputField(InputFieldContainer)

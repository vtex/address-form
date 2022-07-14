import React, { Component } from 'react'
import PropTypes from 'prop-types'

import AddressShapeWithValidation from './propTypes/AddressShapeWithValidation'
import type { AddressWithValidation, ValidatedField } from './types/address'
import type { PostalCodeFieldRule } from './types/rules'

const SHALLOW_PROPS = [
  'Input',
  'autoFocus',
  'loading',
  'field',
  'rules',
  'options',
  'onChangeAddress',
  'shouldShowNumberKeyboard',
  'intl',
]

function shallowCompareProps(prevProps: Props, thisProps: Props) {
  return SHALLOW_PROPS.find((field) => {
    return prevProps[field] !== thisProps[field]
  })
}

const SHALLOW_FIELDS = [
  'autoCompleted',
  'loading',
  'value',
  'focus',
  'reason',
  'valueOptions',
  'notApplicable',
  'disabled',
]

function shallowCompareField(
  prevProps: ValidatedField<unknown>,
  thisProps: ValidatedField<unknown>
) {
  return SHALLOW_FIELDS.find((field) => {
    return prevProps[field] !== thisProps[field]
  })
}

interface Props {
  address: AddressWithValidation
  field: PostalCodeFieldRule
}

function pureInputField<T extends Props>(
  WrappedComponent: React.ComponentType<T>
) {
  class PureInput extends Component<T> {
    public static propTypes = {
      field: PropTypes.object.isRequired,
      address: AddressShapeWithValidation,
    }

    public shouldComponentUpdate(prevProps: T) {
      if (shallowCompareProps(prevProps, this.props)) {
        return true
      }

      const { basedOn } = this.props.field

      if (
        basedOn &&
        prevProps.address[basedOn].value !== this.props.address[basedOn].value
      ) {
        return true
      }

      if (
        shallowCompareField(
          prevProps.address[prevProps.field.name],
          this.props.address[this.props.field.name]
        )
      ) {
        return true
      }

      return false
    }

    public render() {
      return <WrappedComponent {...this.props} />
    }
  }

  return PureInput
}

export default pureInputField

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import AddressShapeWithValidation from './propTypes/AddressShapeWithValidation'

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

function shallowCompareProps(prevProps, thisProps) {
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

function shallowCompareField(prevProps, thisProps) {
  return SHALLOW_FIELDS.find((field) => {
    return prevProps[field] !== thisProps[field]
  })
}

function pureInputField(WrappedComponent) {
  class PureInput extends Component {
    shouldComponentUpdate(prevProps) {
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

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  PureInput.propTypes = {
    autoFocus: false,
    loading: false,
    shouldShowNumberKeyboard: false,
  }

  PureInput.propTypes = {
    Input: PropTypes.func.isRequired,
    autoFocus: PropTypes.bool,
    loading: PropTypes.bool,
    field: PropTypes.object.isRequired,
    address: AddressShapeWithValidation,
    rules: PropTypes.object.isRequired,
    options: PropTypes.array,
    onChangeAddress: PropTypes.func.isRequired,
    shouldShowNumberKeyboard: PropTypes.bool,
  }

  return PureInput
}

export default pureInputField

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation from './propTypes/AddressShapeWithValidation'

const SHALLOW_FIELDS = [
  'Input',
  'autoFocus',
  'field',
  'rules',
  'options',
  'onChangeAddress',
  'shouldShowNumberKeyboard',
]

function shallowCompare(prevProps, thisProps) {
  return SHALLOW_FIELDS.find(field => {
    return prevProps[field] !== thisProps[field]
  })
}

function pureInputField(WrappedComponent) {
  class PureInput extends Component {
    shouldComponentUpdate(prevProps) {
      if (shallowCompare(prevProps, this.props)) {
        return true
      }

      const basedOn = this.props.field.basedOn
      if (basedOn && prevProps.address[basedOn].value !== this.props.address[basedOn].value) {
        return true
      }

      if (prevProps.address[prevProps.field.name].value !==
          this.props.address[this.props.field.name].value) {
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
    shouldShowNumberKeyboard: false,
  }

  PureInput.propTypes = {
    Input: PropTypes.func.isRequired,
    autoFocus: PropTypes.bool,
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

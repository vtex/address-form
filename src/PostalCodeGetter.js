import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation from './propTypes/AddressShapeWithValidation'
import { POSTAL_CODE, ONE_LEVEL, TWO_LEVELS, THREE_LEVELS } from './constants'
import OneLevel from './postalCodeFrom/OneLevel'
import TwoLevels from './postalCodeFrom/TwoLevels'
import ThreeLevels from './postalCodeFrom/ThreeLevels'
import DefaultInput from './DefaultInput'
import InputFieldContainer from './InputFieldContainer'
import { getField } from './selectors/fields'

class PostalCodeGetter extends Component {
  render() {
    const {
      address,
      rules,
      onChangeAddress,
      Input,
      inputExtraProps,
    } = this.props

    switch (rules.postalCodeFrom) {
      case THREE_LEVELS:
        return (
          <ThreeLevels
            Input={Input}
            address={address}
            rules={rules}
            onChangeAddress={onChangeAddress}
            inputExtraProps={inputExtraProps}
          />
        )
      case TWO_LEVELS:
        return (
          <TwoLevels
            Input={Input}
            address={address}
            rules={rules}
            onChangeAddress={onChangeAddress}
            inputExtraProps={inputExtraProps}
          />
        )
      case ONE_LEVEL:
        return (
          <OneLevel
            Input={Input}
            address={address}
            rules={rules}
            onChangeAddress={onChangeAddress}
            inputExtraProps={inputExtraProps}
          />
        )
      default:
      case POSTAL_CODE: {
        const field = getField('postalCode', rules)
        return (
          <InputFieldContainer
            Input={Input}
            field={field}
            address={address}
            rules={rules}
            onChangeAddress={onChangeAddress}
            inputExtraProps={inputExtraProps}
          />
        )
      }
    }
  }
}

PostalCodeGetter.defaultProps = {
  Input: DefaultInput,
}

PostalCodeGetter.propTypes = {
  Input: PropTypes.func,
  address: AddressShapeWithValidation,
  rules: PropTypes.object.isRequired,
  inputExtraProps: PropTypes.object,
  onChangeAddress: PropTypes.func.isRequired,
}

export default PostalCodeGetter

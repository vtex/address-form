import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation from './propTypes/AddressShapeWithValidation'
import { POSTAL_CODE, ONE_LEVEL, TWO_LEVELS, THREE_LEVELS } from './constants'
import OneLevel from './postalCodeFrom/OneLevel'
import TwoLevels from './postalCodeFrom/TwoLevels'
import ThreeLevels from './postalCodeFrom/ThreeLevels'
import DefaultInput from './inputs/DefaultInput'
import InputFieldContainer from './InputFieldContainer'
import { getField } from './selectors/fields'
import { injectRules } from './addressRulesContext'
import { compose } from 'recompose'
import { injectAddressContext } from './addressContainerContext'
import { injectIntl } from 'react-intl'

class PostalCodeGetter extends Component {
  render() {
    const {
      address,
      autoFocus,
      rules,
      onChangeAddress,
      Input,
      intl,
      shouldShowNumberKeyboard,
    } = this.props

    switch (rules.postalCodeFrom) {
      case THREE_LEVELS:
        return (
          <ThreeLevels
            intl={intl}
            Input={Input}
            address={address}
            rules={rules}
            onChangeAddress={onChangeAddress}
          />
        )
      case TWO_LEVELS:
        return (
          <TwoLevels
            intl={intl}
            Input={Input}
            address={address}
            rules={rules}
            onChangeAddress={onChangeAddress}
          />
        )
      case ONE_LEVEL:
        return (
          <OneLevel
            intl={intl}
            Input={Input}
            address={address}
            rules={rules}
            onChangeAddress={onChangeAddress}
          />
        )
      default:
      case POSTAL_CODE: {
        const field = getField('postalCode', rules)
        return (
          <InputFieldContainer
            intl={intl}
            Input={Input}
            field={field}
            address={address}
            autoFocus={autoFocus}
            rules={rules}
            onChangeAddress={onChangeAddress}
            shouldShowNumberKeyboard={shouldShowNumberKeyboard}
          />
        )
      }
    }
  }
}

PostalCodeGetter.defaultProps = {
  autoFocus: false,
  Input: DefaultInput,
  shouldShowNumberKeyboard: false,
}

PostalCodeGetter.propTypes = {
  Input: PropTypes.func,
  autoFocus: PropTypes.bool,
  address: AddressShapeWithValidation,
  rules: PropTypes.object.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
  shouldShowNumberKeyboard: PropTypes.bool,
}

const enhance = compose(
  injectAddressContext,
  injectRules,
  injectIntl,
)
export default enhance(PostalCodeGetter)

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { injectIntl, intlShape } from 'react-intl'

import { POSTAL_CODE, ONE_LEVEL, TWO_LEVELS, THREE_LEVELS } from './constants'
import OneLevel from './postalCodeFrom/OneLevel'
import TwoLevels from './postalCodeFrom/TwoLevels'
import ThreeLevels from './postalCodeFrom/ThreeLevels'
import DefaultInput from './inputs/DefaultInput'
import InputFieldContainer from './InputFieldContainer'
import { getField } from './selectors/fields'
import { injectRules } from './addressRulesContext'
import {
  injectAddressContext,
  addressContextPropTypes,
} from './addressContainerContext'
import { shouldShowNumberKeyboard as determineShouldShowNumberKeyboard } from './transforms/shouldShowNumberKeyboard'

class PostalCodeGetter extends Component {
  render() {
    const {
      address,
      autoFocus,
      loading,
      rules,
      fieldsStyleRules,
      onChangeAddress,
      Input,
      Button,
      intl,
      onSubmit,
      submitLabel,
      omitContainerElement,
    } = this.props

    switch (rules.postalCodeFrom) {
      case THREE_LEVELS:
        return (
          <ThreeLevels
            intl={intl}
            loading={loading}
            Input={Input}
            Button={Button}
            address={address}
            rules={rules}
            fieldsStyleRules={fieldsStyleRules}
            onChangeAddress={onChangeAddress}
            omitContainerElement={omitContainerElement}
            onSubmit={onSubmit}
            submitLabel={submitLabel}
          />
        )

      case TWO_LEVELS:
        return (
          <TwoLevels
            intl={intl}
            loading={loading}
            Input={Input}
            Button={Button}
            address={address}
            rules={rules}
            fieldsStyleRules={fieldsStyleRules}
            onChangeAddress={onChangeAddress}
            omitContainerElement={omitContainerElement}
            onSubmit={onSubmit}
            submitLabel={submitLabel}
          />
        )

      case ONE_LEVEL:
        return (
          <OneLevel
            intl={intl}
            loading={loading}
            Input={Input}
            Button={Button}
            address={address}
            rules={rules}
            fieldsStyleRules={fieldsStyleRules}
            onChangeAddress={onChangeAddress}
            omitContainerElement={omitContainerElement}
            onSubmit={onSubmit}
            submitLabel={submitLabel}
          />
        )

      default:
      case POSTAL_CODE: {
        const field = getField('postalCode', rules)
        const mask = field?.mask
        const shouldShowNumberKeyboard = determineShouldShowNumberKeyboard(mask)

        return (
          <InputFieldContainer
            intl={intl}
            loading={loading}
            Input={Input}
            Button={Button}
            field={field}
            address={address}
            autoFocus={autoFocus}
            rules={rules}
            fieldsStyleRules={fieldsStyleRules}
            onChangeAddress={onChangeAddress}
            onSubmit={onSubmit}
            submitLabel={submitLabel}
            shouldShowNumberKeyboard={shouldShowNumberKeyboard}
          />
        )
      }
    }
  }
}

PostalCodeGetter.defaultProps = {
  autoFocus: false,
  loading: false,
  Input: DefaultInput,
  shouldShowNumberKeyboard: false,
  omitContainerElement: false,
}

PostalCodeGetter.propTypes = {
  ...addressContextPropTypes,
  autoFocus: PropTypes.bool,
  loading: PropTypes.bool,
  Input: PropTypes.func,
  Button: PropTypes.func,
  intl: intlShape.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  rules: PropTypes.object.isRequired,
  shouldShowNumberKeyboard: PropTypes.bool,
  submitLabel: PropTypes.string,
  omitContainerElement: PropTypes.bool,
}

const enhance = compose(injectAddressContext, injectRules, injectIntl)

export default enhance(PostalCodeGetter)

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

import AddressShapeWithValidation from '../propTypes/AddressShapeWithValidation'
import {
  getPostalCodeOptions,
  getLastLevelField,
} from '../selectors/postalCode'
import InputFieldContainer from '../InputFieldContainer'
import { addressContextPropTypes } from '../addressContainerContext'

class SelectPostalCode extends Component {
  handleChange = (changedFields) => {
    const { rules } = this.props
    const currentLevelName = getLastLevelField(rules).name
    const { value } = changedFields[currentLevelName]

    this.props.onChangeAddress({
      ...this.deComposeValue(currentLevelName, value || ''),
    })
  }

  composeValue = (currentLevelName, address) =>
    address[currentLevelName] &&
    address[currentLevelName].value &&
    address.postalCode &&
    address.postalCode.value
      ? `${address[currentLevelName].value}___${address.postalCode.value}`
      : null

  deComposeValue = (currentLevelName, value) => {
    const [field, postalCode] = value.split('___')

    return {
      [currentLevelName]: { value: field },
      postalCode: { value: postalCode },
    }
  }

  getOptions(fieldName, address, rules) {
    return getPostalCodeOptions(address, rules).map(
      ({ postalCode, label }) => ({
        label,
        value: this.composeValue(fieldName, {
          [fieldName]: { value: label },
          postalCode: { value: postalCode },
        }),
      })
    )
  }

  render() {
    const { address, fieldsStyleRules, rules, Input, loading, intl } =
      this.props

    const currentLevelField = getLastLevelField(rules)
    const fieldName = currentLevelField.name

    const newAddress = {
      ...address,
      [fieldName]: {
        ...address[fieldName],
        value: this.composeValue(fieldName, address),
      },
    }

    return (
      <InputFieldContainer
        intl={intl}
        Input={Input}
        loading={loading}
        field={currentLevelField}
        address={newAddress}
        options={this.getOptions(fieldName, address, rules)}
        rules={rules}
        fieldsStyleRules={fieldsStyleRules}
        onChangeAddress={this.handleChange}
      />
    )
  }
}

SelectPostalCode.propTypes = {
  ...addressContextPropTypes,
  Input: PropTypes.func.isRequired,
  intl: intlShape,
  loading: PropTypes.bool,
  address: AddressShapeWithValidation.isRequired,
  rules: PropTypes.object.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
}

export default injectIntl(SelectPostalCode)

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import AddressShapeWithValidation from '../propTypes/AddressShapeWithValidation'
import {
  getPostalCodeOptions,
  getLastLevelField,
  getResolvedPostalCodeFieldLabel,
} from '../selectors/postalCode'
import InputFieldContainer from '../InputFieldContainer'

class SelectPostalCode extends Component {
  handleChange = (changedFields) => {
    const { rules } = this.props
    const currentLevelName = getLastLevelField(rules).name
    const { value } = changedFields[currentLevelName]

    this.props.onChangeAddress({
      ...this.deComposeValue(currentLevelName, value || ''),
    })
  }

  composeValue = (currentLevelName, address, rules) => {
    const postalCodeValue = address.postalCode?.value
    const fieldLabel = getResolvedPostalCodeFieldLabel(
      currentLevelName,
      address,
      rules
    )

    return fieldLabel && postalCodeValue
      ? `${fieldLabel}___${postalCodeValue}`
      : null
  }

  deComposeValue = (currentLevelName, value) => {
    const [field, postalCode] = value.split('___')

    return {
      [currentLevelName]: { value: field, postalCodeAutoCompleted: true },
      postalCode: { value: postalCode },
    }
  }

  getOptions(fieldName, address, rules) {
    return getPostalCodeOptions(address, rules).map(
      ({ postalCode, label }) => ({
        label,
        value: `${label}___${postalCode}`,
      })
    )
  }

  render() {
    const { address, rules, Input, loading } = this.props
    const currentLevelField = getLastLevelField(rules)
    const fieldName = currentLevelField.name

    const newAddress = {
      ...address,
      [fieldName]: {
        ...address[fieldName],
        value: this.composeValue(fieldName, address, rules),
      },
    }

    return (
      <InputFieldContainer
        Input={Input}
        loading={loading}
        field={currentLevelField}
        address={newAddress}
        options={this.getOptions(fieldName, address, rules)}
        rules={rules}
        onChangeAddress={this.handleChange}
      />
    )
  }
}

SelectPostalCode.propTypes = {
  Input: PropTypes.elementType.isRequired,
  loading: PropTypes.bool,
  address: AddressShapeWithValidation.isRequired,
  rules: PropTypes.object.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
}

export default SelectPostalCode

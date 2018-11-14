import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation from '../propTypes/AddressShapeWithValidation'
import {
  getPostalCodeOptions,
  getLastLevelField,
} from '../selectors/postalCode'
import InputFieldContainer from '../InputFieldContainer'

class SelectPostalCode extends Component {
  handleChange = changedFields => {
    const rules = this.props.rules
    const currentLevelName = getLastLevelField(rules).name
    const value = changedFields[currentLevelName].value

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
    return getPostalCodeOptions(
      address,
      rules
    ).map(({ postalCode, label }) => ({
      label,
      value: this.composeValue(fieldName, {
        [fieldName]: { value: label },
        postalCode: { value: postalCode },
      }),
    }))
  }

  render() {
    const { address, rules, Input } = this.props
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
        Input={Input}
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
  Input: PropTypes.func.isRequired,
  address: AddressShapeWithValidation.isRequired,
  rules: PropTypes.object.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
}

export default SelectPostalCode

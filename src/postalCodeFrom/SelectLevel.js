import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation
  from '../propTypes/AddressShapeWithValidation'
import { getDependentFields } from '../selectors/fields'
import { getLevelField } from '../selectors/postalCode'
import reduce from 'lodash/reduce'
import InputFieldContainer from '../InputFieldContainer'

class SelectLevel extends Component {
  handleChange = changedFields => {
    const { level, address, rules, onChangeAddress } = this.props
    const name = getLevelField(level, rules).name
    const value = changedFields[name].value

    const dependentFields = getDependentFields(name, rules)

    const cleanAddress = reduce(
      address,
      (cleanAddress, value, prop) => {
        const isDependentField = dependentFields.indexOf(prop) !== -1
        if (isDependentField) {
          cleanAddress[prop] = { value: null }
        }
        return cleanAddress
      },
      {}
    )

    onChangeAddress({
      ...cleanAddress,
      [name]: {
        ...cleanAddress[name],
        value,
      },
    })
  };

  render() {
    const { level, rules, address, Input } = this.props
    const field = getLevelField(level, rules)

    return (
      <InputFieldContainer
        Input={Input}
        field={field}
        address={address}
        rules={rules}
        onChangeAddress={this.handleChange}
      />
    )
  }
}

SelectLevel.propTypes = {
  Input: PropTypes.func.isRequired,
  level: PropTypes.oneOf([0, 1]),
  address: PropTypes.shape(AddressShapeWithValidation),
  rules: PropTypes.object.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
}

export default SelectLevel

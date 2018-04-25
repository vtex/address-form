import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation from '../propTypes/AddressShapeWithValidation'
import { getLevelField } from '../selectors/postalCode'
import InputFieldContainer from '../InputFieldContainer'

class SelectLevel extends Component {
  render() {
    const {
      level,
      rules,
      address,
      Input,
      onChangeAddress,
      inputExtraProps,
    } = this.props
    const field = getLevelField(level, rules)

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

SelectLevel.propTypes = {
  Input: PropTypes.func.isRequired,
  level: PropTypes.oneOf([0, 1]),
  address: AddressShapeWithValidation,
  rules: PropTypes.object.isRequired,
  inputExtraProps: PropTypes.object,
  onChangeAddress: PropTypes.func.isRequired,
}

export default SelectLevel

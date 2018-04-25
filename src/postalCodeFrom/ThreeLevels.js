import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation from '../propTypes/AddressShapeWithValidation'
import SelectLevel from './SelectLevel'
import SelectPostalCode from './SelectPostalCode'

class ThreeLevels extends Component {
  render() {
    const {
      address,
      rules,
      Input,
      onChangeAddress,
      inputExtraProps,
    } = this.props

    return (
      <div>
        <SelectLevel
          level={0}
          Input={Input}
          rules={rules}
          address={address}
          onChangeAddress={onChangeAddress}
          inputExtraProps={inputExtraProps}
        />
        <SelectLevel
          level={1}
          Input={Input}
          rules={rules}
          address={address}
          onChangeAddress={onChangeAddress}
          inputExtraProps={inputExtraProps}
        />
        <SelectPostalCode
          Input={Input}
          rules={rules}
          address={address}
          onChangeAddress={onChangeAddress}
          inputExtraProps={inputExtraProps}
        />
      </div>
    )
  }
}

ThreeLevels.propTypes = {
  Input: PropTypes.func.isRequired,
  address: AddressShapeWithValidation,
  inputExtraProps: PropTypes.object,
  rules: PropTypes.object.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
}

export default ThreeLevels

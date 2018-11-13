import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation from '../propTypes/AddressShapeWithValidation'
import SelectPostalCode from './SelectPostalCode'

class OneLevel extends Component {
  render() {
    const { address, rules, onChangeAddress, Input } = this.props

    return (
      <div>
        <SelectPostalCode
          Input={Input}
          rules={rules}
          address={address}
          onChangeAddress={onChangeAddress}
        />
      </div>
    )
  }
}

OneLevel.propTypes = {
  Input: PropTypes.func.isRequired,
  address: AddressShapeWithValidation,
  rules: PropTypes.object.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
}

export default OneLevel

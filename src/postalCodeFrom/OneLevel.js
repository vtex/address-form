import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation
  from '../propTypes/AddressShapeWithValidation'
import SelectPostalCode from './SelectPostalCode'
import Input from '../addressInputs/Input'

class OneLevel extends Component {
  render() {
    const { address, rules, onChangeAddress } = this.props

    return (
      <div>
        <SelectPostalCode
          rules={rules}
          address={address}
          onChangeAddress={onChangeAddress}
        >
          {({ field, address, onChangeAddress, options }) => (
            <Input
              key={field.name}
              field={field}
              options={options}
              address={address}
              onChangeAddress={onChangeAddress}
            />
          )}
        </SelectPostalCode>
      </div>
    )
  }
}

OneLevel.propTypes = {
  address: PropTypes.shape(AddressShapeWithValidation),
  rules: PropTypes.object.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
}

export default OneLevel

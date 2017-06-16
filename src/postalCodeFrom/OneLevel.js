import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShape from '../propTypes/AddressShape'
import SelectPostalCode from './SelectPostalCode'

class OneLevel extends Component {
  render() {
    const { address, rules, onChangeAddress } = this.props

    return (
      <div>
        <SelectPostalCode
          address={address}
          rules={rules}
          onChangeAddress={onChangeAddress}
        />
      </div>
    )
  }
}

OneLevel.propTypes = {
  address: PropTypes.shape(AddressShape),
  rules: PropTypes.object.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
}

export default OneLevel

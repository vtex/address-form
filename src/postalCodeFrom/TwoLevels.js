import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShape from '../propTypes/AddressShape'
import SelectLevel from './SelectLevel'
import SelectPostalCode from './SelectPostalCode'

class TwoLevels extends Component {
  render() {
    const { address, rules, onChangeAddress } = this.props

    return (
      <div>
        <SelectLevel
          level={0}
          rules={rules}
          address={address}
          onChangeAddress={onChangeAddress}
        />
        <SelectPostalCode
          address={address}
          rules={rules}
          onChangeAddress={onChangeAddress}
        />
      </div>
    )
  }
}

TwoLevels.propTypes = {
  address: PropTypes.shape(AddressShape),
  rules: PropTypes.object.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
}

export default TwoLevels

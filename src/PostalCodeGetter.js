import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation from './propTypes/AddressShapeWithValidation'
import { POSTAL_CODE, ONE_LEVEL, TWO_LEVELS, THREE_LEVELS } from './constants'
import PostalCode from './postalCodeFrom/PostalCode'
import OneLevel from './postalCodeFrom/OneLevel'
import TwoLevels from './postalCodeFrom/TwoLevels'
import ThreeLevels from './postalCodeFrom/ThreeLevels'

class PostalCodeGetter extends Component {
  render() {
    const { address, rules, onChangeAddress } = this.props

    switch (rules.postalCodeFrom) {
      case THREE_LEVELS:
        return (
          <ThreeLevels
            address={address}
            rules={rules}
            onChangeAddress={onChangeAddress}
          />
        )
      case TWO_LEVELS:
        return (
          <TwoLevels
            address={address}
            rules={rules}
            onChangeAddress={onChangeAddress}
          />
        )
      case ONE_LEVEL:
        return (
          <OneLevel
            address={address}
            rules={rules}
            onChangeAddress={onChangeAddress}
          />
        )
      default:
      case POSTAL_CODE:
        return (
          <PostalCode
            address={address}
            rules={rules}
            onChangeAddress={onChangeAddress}
          />
        )
    }
  }
}

PostalCodeGetter.propTypes = {
  address: PropTypes.shape(AddressShapeWithValidation),
  rules: PropTypes.object.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
}

export default PostalCodeGetter

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShape from './propTypes/AddressShape'
import { POSTAL_CODE, STATE, CITY, NEIGHBORHOOD } from './constants'
import PostalCode from './postalCodeFrom/PostalCode'
import State from './postalCodeFrom/State'
import City from './postalCodeFrom/City'
import Neighborhood from './postalCodeFrom/Neighborhood'

class PostalCodeGetter extends Component {
  render() {
    const { address, rules, onChangeAddress } = this.props

    switch (rules.postalCodeFrom) {
      case NEIGHBORHOOD:
        return (
          <Neighborhood
            address={address}
            rules={rules}
            onChangeAddress={onChangeAddress}
          />
        )
      case CITY:
        return (
          <City
            address={address}
            rules={rules}
            onChangeAddress={onChangeAddress}
          />
        )
      case STATE:
        return (
          <State
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
  address: PropTypes.shape(AddressShape),
  rules: PropTypes.object.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
}

export default PostalCodeGetter

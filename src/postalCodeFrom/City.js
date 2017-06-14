import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShape from '../propTypes/AddressShape'
import find from 'lodash/find'
import map from 'lodash/map'

class City extends Component {
  handleStateChange = e => {
    const state = e.target.value

    this.props.onChangeAddress({
      ...this.props.address,
      state,
    })
  };

  handleCityChange = e => {
    const value = e.target.value

    this.props.onChangeAddress({
      ...this.props.address,
      ...this.deComposeValue(value),
    })
  };

  composeValue = address =>
    (address.city && address.postalCode
      ? `${address.city}___${address.postalCode}`
      : '');

  deComposeValue = value => {
    const [city, postalCode] = value.split('___')
    return { city, postalCode }
  };

  render() {
    const { address, rules } = this.props

    const stateOptions = find(rules.fields, field => field.field === 'state')
      .options

    return (
      <div>
        <label>
          State
          <select value={address.state || ''} onChange={this.handleStateChange}>
            <option value="" />
            {stateOptions.map(state => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </label>
        <label>
          City
          <select
            value={this.composeValue(address)}
            onChange={this.handleCityChange}
          >
            {address.state
              ? map(rules.citiesPostalCodes[address.state], ({
                  postalCode,
                  city,
                }) => (
                  <option
                    key={city}
                    value={this.composeValue({ city, postalCode })}
                  >
                    {city}
                  </option>
                ))
              : null}
          </select>
        </label>
      </div>
    )
  }
}

City.propTypes = {
  address: PropTypes.shape(AddressShape),
  rules: PropTypes.object.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
}

export default City

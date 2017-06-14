import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShape from '../propTypes/AddressShape'

class State extends Component {
  handleChange = e => {
    const value = e.target.value

    this.props.onChangeAddress({
      ...this.props.address,
      ...this.deComposeValue(value),
    })
  };

  composeValue = address =>
    (address.state && address.postalCode
      ? `${address.state}___${address.postalCode}`
      : '');

  deComposeValue = value => {
    const [state, postalCode] = value.split('___')
    return { state, postalCode }
  };

  render() {
    const { address, rules } = this.props

    return (
      <div>
        <label>
          State
          <select
            name="state"
            value={this.composeValue(address) || ''}
            onChange={this.handleChange}
          >
            <option value="" />
            {rules.statePostalCodes.map(({ postalCode, state }) => (
              <option
                key={state}
                value={this.composeValue({ state, postalCode })}
              >
                {state}
              </option>
            ))}
          </select>
        </label>
      </div>
    )
  }
}

State.propTypes = {
  address: PropTypes.shape(AddressShape),
  rules: PropTypes.object.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
}

export default State

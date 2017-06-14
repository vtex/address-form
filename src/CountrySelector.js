import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShape from './propTypes/AddressShape'

class CountrySelector extends Component {
  handleChange = e => {
    const country = e.target.value
    this.props.onChangeAddress({
      ...this.props.address,
      postalCode: null,
      country,
    })
  };

  render() {
    const { address, shipsTo } = this.props

    return (
      <div className="country-selector">
        <label>
          País
          <select value={address.country || ''} onChange={this.handleChange}>
            {shipsTo.map(country => (
              <option value={country} key={country}>
                {country}
              </option>
            ))}
          </select>
        </label>
      </div>
    )
  }
}

CountrySelector.propTypes = {
  address: PropTypes.shape(AddressShape),
  shipsTo: PropTypes.array.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
}

export default CountrySelector

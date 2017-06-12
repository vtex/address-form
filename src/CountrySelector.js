import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CountryType from './propTypes/CountryType'

class CountrySelector extends Component {
  render() {
    const { country, shipsTo, onChangeSelectedCountry } = this.props

    return (
      <div className="country-selector">
        <label>
          País
          <select value={country} onChange={onChangeSelectedCountry}>
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
  country: CountryType,
  shipsTo: PropTypes.array.isRequired,
  onChangeSelectedCountry: PropTypes.func.isRequired,
}

export default CountrySelector

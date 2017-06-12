import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CountryType from './propTypes/CountryType'

class CountrySelector extends Component {
  handleChange = e => {
    this.props.onChangeSelectedCountry(e.target.value)
  };

  render() {
    const { country, shipsTo } = this.props

    return (
      <div className="country-selector">
        <label>
          País
          <select value={country} onChange={this.handleChange}>
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

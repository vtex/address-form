import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation from './propTypes/AddressShapeWithValidation'

class CountrySelector extends Component {
  handleChange = e => {
    const country = e.target.value
    this.props.onChangeAddress({
      ...this.props.address,
      postalCode: { value: null },
      state: { value: null },
      city: { value: null },
      neighborhood: { value: null },
      country: { value: country },
    })
  };

  render() {
    const { address, shipsTo } = this.props

    return (
      <div className="country-selector">
        <label>
          País
          <select
            value={address.country.value || ''}
            onChange={this.handleChange}
          >
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
  address: PropTypes.shape(AddressShapeWithValidation),
  shipsTo: PropTypes.array.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
}

export default CountrySelector

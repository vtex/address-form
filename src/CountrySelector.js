import React, { Component } from 'react'
import PropTypes from 'prop-types'

class CountrySelector extends Component {
  render() {
    return <div />
  }
}

CountrySelector.propTypes = {
  shipsTo: PropTypes.array.isRequired,
  onChangeSelectedCountry: PropTypes.func.isRequired,
}

export default CountrySelector

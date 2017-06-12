import React, { Component } from 'react'
import PropTypes from 'prop-types'

class GeolocationInput extends Component {
  render() {
    return <div />
  }
}

GeolocationInput.propTypes = {
  country: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default GeolocationInput

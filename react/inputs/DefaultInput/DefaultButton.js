import React, { Component } from 'react'
import PropTypes from 'prop-types'

class DefaultButton extends Component {
  render() {
    const { buttonLabel } = this.props
    return <button type="submit">{buttonLabel}</button>
  }
}

DefaultButton.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default DefaultButton

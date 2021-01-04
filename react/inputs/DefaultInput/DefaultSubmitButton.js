import React, { Component } from 'react'
import PropTypes from 'prop-types'

class DefaultSubmitButton extends Component {
  render() {
    const { buttonLabel } = this.props

    return <button type="submit">{buttonLabel}</button>
  }
}

DefaultSubmitButton.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default DefaultSubmitButton

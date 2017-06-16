import React, { Component } from 'react'
import PropTypes from 'prop-types'

class InputLabel extends Component {
  render() {
    const { field, children } = this.props

    return (
      <label>
        {field.fixedLabel || field.label}
        {children}
      </label>
    )
  }
}

InputLabel.propTypes = {
  field: PropTypes.object,
  children: PropTypes.node.isRequired,
}

export default InputLabel

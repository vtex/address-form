import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

class InputLabel extends Component {
  render() {
    const { field, children } = this.props

    const className = cx('input', {
      required: field.required,
      text: true, // That's a bug in the Checkout's CSS
    })

    return (
      <p className={className}>
        <label>
          {field.fixedLabel || field.label}
        </label>
        {children}
      </p>
    )
  }
}

InputLabel.propTypes = {
  field: PropTypes.object,
  children: PropTypes.node.isRequired,
}

export default InputLabel

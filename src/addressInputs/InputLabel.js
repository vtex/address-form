import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { hasOptions } from '../selectors/fields'
import cx from 'classnames'

class InputLabel extends Component {
  render() {
    const { field, children } = this.props
    const fieldHasOptions = hasOptions(field)

    const className = cx('input', {
      required: field.required,
      text: fieldHasOptions === false,
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

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { injectIntl, intlShape } from 'react-intl'

class InputLabel extends Component {
  render() {
    const { field, children, intl } = this.props

    const className = cx('input', `ship-${field.name}`, {
      required: field.required,
      hide: field.hidden,
      text: true, // That's a bug in the Checkout's CSS
    })

    return (
      <p className={className}>
        <label htmlFor={`ship-${field.name}`}>
          {field.fixedLabel ||
            intl.formatMessage({ id: `address-form.field.${field.label}` })}
        </label>
        {children}
      </p>
    )
  }
}

InputLabel.propTypes = {
  field: PropTypes.object,
  children: PropTypes.node.isRequired,
  intl: intlShape,
}

export default injectIntl(InputLabel)

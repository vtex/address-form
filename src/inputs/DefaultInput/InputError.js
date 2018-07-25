import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

class InputError extends Component {
  render() {
    const { reason, intl } = this.props

    const message = intl.formatMessage({
      id: `address-form.error.${reason}`,
      defaultMessage: intl.formatMessage({
        id: 'address-form.error.generic',
      }),
    })

    return <span className="help error">{message}</span>
  }
}

InputError.propTypes = {
  reason: PropTypes.string.isRequired,
  intl: intlShape,
}

export default injectIntl(InputError)

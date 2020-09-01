import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { injectIntl, intlShape } from '../intl/utils'

class SubmitButton extends Component {
  render() {
    const { Button, buttonLabel, intl } = this.props

    return <Button intl={intl} Button={Button} buttonLabel={buttonLabel} />
  }
}

SubmitButton.propTypes = {
  Button: PropTypes.func.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  intl: intlShape,
}

export default injectIntl(SubmitButton)

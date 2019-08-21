import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@vtex/styleguide/lib/Button'
import { injectIntl, intlShape } from 'react-intl'

class StyleguideButton extends Component {
  render() {
    const { buttonLabel, intl } = this.props
    return (
      <Button type="submit" size="small" variation="secondary">
        {buttonLabel || intl.formatMessage('')}
      </Button>
    )
  }
}

StyleguideButton.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  intl: intlShape,
}

export default injectIntl(StyleguideButton)

import React from 'react'
import PropTypes from 'prop-types'

const Intl = require.requireActual('react-intl')

// Here goes intl context injected into component, feel free to extend
const intl = {
  formatMessage: ({ defaultMessage }) => defaultMessage,
}

const intlShape = PropTypes.shape({
  intl: PropTypes.object,
})

Intl.injectIntl = Node => props => <Node {...props} intl={intl} />
Intl.intlShape = intlShape

module.exports = Intl

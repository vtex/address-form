import React from 'react'
import PropTypes from 'prop-types'
import * as reactIntl from 'react-intl'

export const injectIntl =
  'injectIntl' in reactIntl
    ? reactIntl.injectIntl
    : (Component) => {
        const InjectedComponent = (props) => {
          const intl = reactIntl.useIntl()

          return <Component {...props} intl={intl} />
        }

        InjectedComponent.displayName = `injectIntl(${Component.displayName})`

        return InjectedComponent
      }

export const intlShape =
  'intlShape' in reactIntl
    ? reactIntl.intlShape
    : PropTypes.shape({
        formatDate: PropTypes.func.isRequired,
        formatTime: PropTypes.func.isRequired,
        formatNumber: PropTypes.func.isRequired,
        formatPlural: PropTypes.func.isRequired,
        formatMessage: PropTypes.func.isRequired,
        locale: PropTypes.string,
      })

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { IntlProvider, addLocaleData } from 'react-intl'

import enLocaleData from 'react-intl/locale-data/en'
import enAdressFormTranslations from '../../src/locales/en.json'
import enCountryCodeTranslations from 'i18n-iso-countries/langs/en.json'
import countryCodes from 'i18n-iso-countries/codes.json'

class IntlHandler extends Component {
  constructor(props) {
    super(props)

    const encct = {}
    Object.keys(enCountryCodeTranslations).forEach(key => {
      encct[`country.${this.getISOAlpha3(key)}`] =
        enCountryCodeTranslations[key]
    })

    this.state = {
      messages: {
        ...enAdressFormTranslations,
        ...encct,
      },
    }

    addLocaleData(enLocaleData)
  }

  getISOAlpha3 = countryCodeAlpha2 => {
    const country = countryCodes.find(
      country => country[0] === countryCodeAlpha2,
    )

    return country ? country[1] : null
  }

  render() {
    const { children } = this.props
    const { messages } = this.state
    return (
      <IntlProvider locale={'en'} messages={messages}>
        {children}
      </IntlProvider>
    )
  }
}

IntlHandler.propTypes = {
  children: PropTypes.any,
}

export default IntlHandler

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import countryCodes from 'i18n-iso-countries/codes.json'
import { addLocaleData, IntlProvider } from 'react-intl'

class AddressIntl extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: {},
    }
  }

  componentDidMount() {
    const { imports, locale } = this.props

    this.handleTranslations(imports(locale, this.getBaseLocale(locale)))
  }

  componentDidUpdate(prevProps) {
    const { imports, locale } = this.props

    if (prevProps.locale !== locale) {
      this.handleTranslations(imports(locale, this.getBaseLocale(locale)))
    }
  }

  generateCountryTranslations(countryIntl) {
    const translations = {}
    Object.keys(countryIntl).forEach(key => {
      const country = countryCodes.find(country => country[0] === key)
      const alpha3 = country ? country[1] : null
      translations[`country.${alpha3}`] = countryIntl[key]
    })
    return translations
  }

  getBaseLocale(locale) {
    return locale.indexOf('-') !== -1 ? locale.split('-')[0] : locale
  }

  handleTranslations(localePromises) {
    const {
      countryData,
      reactData,
      addressBaseData,
      addressData,
    } = localePromises

    this.setState(() => ({
      messages: {},
    }))

    Promise.all([countryData, reactData, addressBaseData, addressData]).then(
      ([countryIntl, reactIntl, addressBaseIntl, addressIntl]) => {
        addLocaleData(reactIntl)
        this.setState(prevState => ({
          messages: {
            ...this.generateCountryTranslations(countryIntl),
            ...addressBaseIntl,
            ...addressIntl,
          },
        }))
      },
    )
  }

  render() {
    const { children, locale } = this.props
    const { messages } = this.state
    const messagesArrived = Object.keys(messages).length > 0

    return (
      <IntlProvider locale={locale} messages={messages}>
        {messagesArrived ? children : <div />}
      </IntlProvider>
    )
  }
}

AddressIntl.propTypes = {
  children: PropTypes.any.isRequired,
  locale: PropTypes.string.isRequired,
  imports: PropTypes.any.isRequired,
}

export default AddressIntl

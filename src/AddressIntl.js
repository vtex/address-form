import React, { Component } from 'react'
import PropTypes from 'prop-types'
import countryCodes from 'i18n-iso-countries/codes.json'
import { addLocaleData, IntlProvider } from 'react-intl'

class AddressIntl extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: null,
      locale: null,
    }
  }

  componentDidMount() {
    this.updateTranslations()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.locale !== this.props.locale) {
      this.updateTranslations()
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

  updateTranslations() {
    const { imports, locale } = this.props

    this.setState({
      locale: locale,
    })

    this.handleTranslationPromises(imports(locale, this.getBaseLocale(locale)))
  }

  handleTranslationPromises(localePromises) {
    const {
      countryData,
      reactData,
      addressBaseData,
      addressData,
    } = localePromises

    this.setState(() => ({
      messages: null,
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
    const { children } = this.props
    const { messages, locale } = this.state

    return (
      <div>
        {messages && locale ? (
          <IntlProvider locale={locale} messages={messages}>
            {children}
          </IntlProvider>
        ) : null}
      </div>
    )
  }
}

AddressIntl.propTypes = {
  children: PropTypes.any.isRequired,
  locale: PropTypes.string.isRequired,
  imports: PropTypes.any.isRequired,
}

export default AddressIntl

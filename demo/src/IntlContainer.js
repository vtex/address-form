import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { IntlProvider, addLocaleData } from 'react-intl'
import reduce from 'lodash/reduce'
import { getISOAlpha3 } from './countryISO'

import enLocaleData from 'react-intl/locale-data/en'
import enAdressFormTranslations from '../../react/locales/en.json'
import enCountryCodeTranslations from 'i18n-iso-countries/langs/en.json'

addLocaleData(enLocaleData)

class IntlContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      locale: 'en',
      messages: {
        ...enAdressFormTranslations,
        ...this.addCountryCodeNameSpace(enCountryCodeTranslations),
      },
    }
  }

  componentDidMount() {
    this.handleLocaleChange({}, this.props.locale)
  }

  componentWillReceiveProps(nextProps) {
    this.handleLocaleChange({}, nextProps.locale)
  }

  getBaseLocale(locale) {
    return locale.indexOf('-') !== -1 ? locale.split('-')[0] : locale
  }

  handleLocaleChange = (e, locale) => {
    const baseLocale = this.getBaseLocale(locale)

    Promise.all([
      import('react-intl/locale-data/' + baseLocale),
      this.importTranslations(baseLocale, locale),
      this.importCountryCodeTranslations(baseLocale, locale),
    ])
      .then(([localeData, translations, countryCodeTranslations]) => {
        this.handleNewTranslations(
          locale,
          {
            ...translations,
            ...countryCodeTranslations,
          },
          localeData
        )
      })
      .catch(e => {
        console.error(e)
        return Promise.reject(e)
      })
  }

  importTranslations(baseLocale, locale) {
    return Promise.all([
      import('../../react/locales/' + baseLocale),
      import('../../react/locales/' + locale),
    ])
      .then(([baseTranslation, translation]) => {
        return {
          ...baseTranslation,
          ...translation,
        }
      })
      .catch(e => {
        const module = this.couldNotFindModuleError(e)
        if (!module) return Promise.reject(e)

        return import('../../react/locales/' + baseLocale)
      })
  }

  importCountryCodeTranslations(baseLocale, locale) {
    return import(`i18n-iso-countries/langs/${baseLocale}.json`).then(
      this.addCountryCodeNameSpace
    )
  }

  addCountryCodeNameSpace(obj) {
    return reduce(
      obj,
      (acc, value, key) => {
        acc[`country.${getISOAlpha3(key)}`] = value
        return acc
      },
      {}
    )
  }

  couldNotFindModuleError(e) {
    const regex = new RegExp(/Cannot find module '\.\/([A-z-]{1,7})\'\./)
    const result = regex.exec(e.message)
    if (!result) return false

    return result[1]
  }

  handleNewTranslations = (locale, messages, localeData) => {
    addLocaleData(localeData)
    this.setState({
      locale,
      messages,
    })
  }

  render() {
    const { locale, messages } = this.state

    return (
      <IntlProvider key={locale} locale={locale} messages={messages}>
        {this.props.children}
      </IntlProvider>
    )
  }
}

IntlContainer.propTypes = {
  locale: PropTypes.string.isRequired,
  children: PropTypes.element,
}

export default IntlContainer

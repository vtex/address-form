import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { IntlProvider, addLocaleData } from 'react-intl'
import ptLocale from 'react-intl/locale-data/pt'
import translation from '../../src/locales/pt.json'
import reduce from 'lodash/reduce'
import { getISOAlpha3 } from './countryISO'

addLocaleData(ptLocale)

class IntlContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      locale: 'pt-BR',
      messages: translation,
    }
  }

  componentDidMount() {
    this.handleLocaleChange({}, this.state.locale)
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
      import('../../src/locales/' + baseLocale),
      import('../../src/locales/' + locale),
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

        return import('../../src/locales/' + baseLocale)
      })
  }

  importCountryCodeTranslations(baseLocale, locale) {
    return import(`i18n-iso-countries/langs/${baseLocale}.json`).then(
      translations =>
        reduce(
          translations,
          (acc, value, key) => {
            acc[`country.${getISOAlpha3(key)}`] = value
            return acc
          },
          {}
        )
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
    const { children } = this.props

    return (
      <IntlProvider
        key={this.state.locale}
        locale={this.state.locale}
        messages={this.state.messages}
      >
        {children}
      </IntlProvider>
    )
  }
}

IntlContainer.propTypes = {
  children: PropTypes.element,
}

export default IntlContainer

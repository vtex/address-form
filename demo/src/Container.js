import React, { Component } from 'react'
import IntlContainer from './IntlContainer'
import Styles from './Styles'
import App from './App'
import IntlHandler from './IntlHandler'
import IntlApp from './IntlApp'
import { IntlProvider } from 'react-intl'
import AddressIntl from '../../src/AddressIntl'

const ACCOUNT_NAME = 'qamarketplace'
const API_KEY = 'AIzaSyATLp76vkHxfMZqJF_sJbjQqZwvSIBhsTM'
const shipsTo = [
  'ARG',
  'BOL',
  'BRA',
  'CAN',
  'CHL',
  'COL',
  'ECU',
  'ESP',
  'GTM',
  'MEX',
  'PER',
  'PRT',
  'PRY',
  'URY',
  'USA',
  'VEN',
]

class Container extends Component {
  constructor(props) {
    super(props)
    this.state = {
      locale: 'en',
    }
  }

  handleClick = () => {
    if (this.state.locale === 'en') {
      this.setState({
        locale: 'pt-BR',
      })
    } else {
      this.setState({
        locale: 'en',
      })
    }
  }

  render() {
    // return (
    //   <IntlContainer locale={locale}>
    //     <Styles>
    //       <App
    //         accountName={ACCOUNT_NAME}
    //         googleMapsAPIKey={API_KEY}
    //         locale={locale}
    //         shipsTo={shipsTo}
    //       />
    //     </Styles>
    //   </IntlContainer>
    // )

    const { locale } = this.state

    return (
      <IntlProvider locale={'en'} messages={null}>
        <div>
          <IntlHandler>
            <IntlApp shipsTo={shipsTo} />
          </IntlHandler>
          <hr className="mv9" />
          <button onClick={this.handleClick}>Switch locale to pt-BR</button>
          <button onClick={this.handleClick}>Switch locale to en</button>

          <hr className="mv9" />
          <AddressIntl
            locale={locale}
            imports={(locale, baseLocale) => {
              return {
                countryData: import('i18n-iso-countries/langs/' +
                  baseLocale +
                  '.json'),
                reactData: import('react-intl/locale-data/' + baseLocale),
                addressBaseData: import('../../src/locales/' +
                  baseLocale +
                  '.json'),
                addressData: import('../../src/locales/' + locale + '.json'),
              }
            }}
          >
            <IntlApp shipsTo={shipsTo} />
          </AddressIntl>
        </div>
      </IntlProvider>
    )
  }
}

export default Container

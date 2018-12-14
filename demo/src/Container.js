import React, { Component } from 'react'
import IntlContainer from './IntlContainer'
import App from './App'
import RulesApp from './RulesApp'

const ACCOUNT_NAME = 'qamarketplace'
const API_KEY = 'AIzaSyATLp76vkHxfMZqJF_sJbjQqZwvSIBhsTM'
const locale = 'en'
const shipsTo = [
  'ARG',
  'BOL',
  'BRA',
  'CAN',
  'CHL',
  'COL',
  'ECU',
  'ESP',
  'FRA',
  'GBR',
  'GTM',
  'MEX',
  'PER',
  'PRT',
  'PRY',
  'ROU',
  'URY',
  'USA',
  'VEN',
]

class Container extends Component {
  render() {
    return (
      <IntlContainer locale={locale}>
        <React.Fragment>
          <App
            accountName={ACCOUNT_NAME}
            googleMapsAPIKey={API_KEY}
            locale={locale}
            shipsTo={shipsTo}
          />
          <hr className="mv4" />
          <RulesApp />
        </React.Fragment>
      </IntlContainer>
    )
  }
}

export default Container

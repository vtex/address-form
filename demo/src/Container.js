import React, { Component } from 'react'
import IntlContainer from './IntlContainer'
import App from './App'

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
  render() {
    return (
      <IntlContainer locale={locale}>
        <App
          accountName={ACCOUNT_NAME}
          googleMapsAPIKey={API_KEY}
          locale={locale}
          shipsTo={shipsTo}
        />
      </IntlContainer>
    )
  }
}

export default Container

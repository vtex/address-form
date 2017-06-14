import React, { Component } from 'react'
import CountrySelector from './CountrySelector'
import AddressForm from './AddressForm'
import PostalCodeGetter from './PostalCodeGetter'
import BOL from './country/BOL'
import BRA from './country/BRA'
import CHL from './country/CHL'
import ECU from './country/ECU'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      shipsTo: ['BRA', 'BOL', 'CHL', 'ECU'],
      address: {
        addressId: '1',
        addressType: 'residential',
        city: null,
        complement: null,
        country: 'BRA',
        geoCoordinates: [],
        neighborhood: null,
        number: null,
        postalCode: null,
        receiverName: null,
        reference: null,
        state: null,
        street: null,
      },
      rules: {
        BOL,
        BRA,
        CHL,
        ECU,
      },
    }
  }

  handleChangeAddress = address => {
    this.setState({
      address,
    })
  };

  render() {
    const { shipsTo, address, rules } = this.state

    return (
      <div>
        <CountrySelector
          address={address}
          shipsTo={shipsTo}
          onChangeAddress={this.handleChangeAddress}
        />
        <PostalCodeGetter
          address={address}
          rules={rules[address.country]}
          onChangeAddress={this.handleChangeAddress}
        />
      </div>
    )
  }
}

export default App

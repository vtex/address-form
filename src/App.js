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
        addressId: { value: '1' },
        addressType: { value: 'residential' },
        city: { value: null },
        complement: { value: null },
        country: { value: 'BRA' },
        geoCoordinates: { value: [] },
        neighborhood: { value: null },
        number: { value: null },
        postalCode: { value: null },
        receiverName: { value: null },
        reference: { value: null },
        state: { value: null },
        street: { value: null },
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
        <pre>{JSON.stringify(address, null, 2)}</pre>

        <CountrySelector
          address={address}
          shipsTo={shipsTo}
          onChangeAddress={this.handleChangeAddress}
        />

        <PostalCodeGetter
          address={address}
          rules={rules[address.country.value]}
          onChangeAddress={this.handleChangeAddress}
        />

        <AddressForm
          address={address}
          rules={rules[address.country.value]}
          onChangeAddress={this.handleChangeAddress}
        />
      </div>
    )
  }
}

export default App

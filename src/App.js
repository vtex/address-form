import React, { Component } from 'react'
import CountrySelector from './CountrySelector'
import AddressForm from './AddressForm'
import AddressSummary from './AddressSummary'
import PostalCodeGetter from './PostalCodeGetter'
import BOL from './country/BOL'
import BRA from './country/BRA'
import CHL from './country/CHL'
import ECU from './country/ECU'
import { addValidation, removeValidation } from './transforms/address'
import AddressContainer from './AddressContainer'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      shipsTo: ['BRA', 'BOL', 'CHL', 'ECU'],
      address: addValidation({
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
      }),
      rules: {
        BOL,
        BRA,
        CHL,
        ECU,
      },
    }
  }

  handleAddressChange = address => {
    this.setState(prevState => ({
      address: {
        ...prevState.address,
        ...address,
      },
    }))
  };

  render() {
    const { shipsTo, address, rules } = this.state

    return (
      <div className="step" style={{ padding: '20px' }}>
        <div style={{ float: 'right', width: '50%' }}>
          <pre><small>{JSON.stringify(address, null, 2)}</small></pre>
        </div>
        <div>
          <AddressContainer
            address={address}
            rules={rules}
            onChangeAddress={this.handleAddressChange}
          >
            {({ address, rules, onChangeAddress }) => (
              <div>
                <CountrySelector
                  address={address}
                  shipsTo={shipsTo}
                  onChangeAddress={onChangeAddress}
                />

                <PostalCodeGetter
                  address={address}
                  rules={rules}
                  onChangeAddress={onChangeAddress}
                />

                <AddressForm
                  address={address}
                  rules={rules}
                  onChangeAddress={onChangeAddress}
                />
              </div>
            )}
          </AddressContainer>

          <hr />

          <AddressSummary
            address={removeValidation(address)}
            rules={rules[address.country.value]}
          />
        </div>
      </div>
    )
  }
}

export default App

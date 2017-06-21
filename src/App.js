import React, { Component } from 'react'
import CountrySelector from './CountrySelector'
import AddressForm from './AddressForm'
import AddressSummary from './AddressSummary'
import PostalCodeGetter from './PostalCodeGetter'
import BOL from './country/BOL'
import BRA from './country/BRA'
import CHL from './country/CHL'
import ECU from './country/ECU'
import { validateChangedFields } from './validateAddress'
import { addValidation, removeValidation } from './transforms/address'

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

  handleChangeAddress = changedAddressFields => {
    this.setState(prevState => {
      const country = changedAddressFields.country &&
        changedAddressFields.country.value
        ? changedAddressFields.country.value
        : prevState.address.country.value

      const rules = prevState.rules[country]

      return {
        address: validateChangedFields(
          changedAddressFields,
          prevState.address,
          rules
        ),
      }
    })
  };

  render() {
    const { shipsTo, address, rules } = this.state

    return (
      <div className="step" style={{ padding: '20px' }}>
        <div style={{ float: 'right', width: '50%' }}>
          <pre><small>{JSON.stringify(address, null, 2)}</small></pre>
        </div>
        <div>
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

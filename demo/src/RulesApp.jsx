import React, { Component } from 'react'
import AddressSummary from '@vtex/address-form/lib/AddressSummary'
import AddressRules from '@vtex/address-form/lib/AddressRules'

class RulesApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      country: 'BRA',
      address: {
        addressId: '1',
        addressType: 'residential',
        city: 'São Paulo',
        complement: 'sala 105',
        country: 'BRA',
        geoCoordinates: [],
        neighborhood: 'Jardim Paulistano',
        number: '3500',
        postalCode: '01452-001',
        receiverName: 'Gustavo Silva',
        reference: null,
        state: 'SP',
        street: 'Av. Brig. Faria Lima',
        addressQuery: null,
      },
    }
  }

  handleBRA = () => {
    this.setState({
      country: 'BRA',
    })
  }

  handleUSA = () => {
    this.setState({
      country: 'USA',
    })
  }

  handleWrong = () => {
    this.setState({
      country: 'XXX',
    })
  }

  render() {
    const { address, country } = this.state

    return (
      <div className="pa6">
        <h3>AddressRules demo:</h3>
        <button onClick={this.handleBRA}>Set rule to BRA</button>
        <button onClick={this.handleUSA}>Set rule to USA</button>
        <button onClick={this.handleWrong}>
          Set rule to malformed country
        </button>
        <div className="mt8">
          <AddressRules
            country={country}
            fetch={(c) => import(`@vtex/address-form/lib/country/${c}`)}
          >
            <AddressSummary address={address} />
          </AddressRules>
        </div>
      </div>
    )
  }
}

RulesApp.propTypes = {}

export default RulesApp

import React, { Component } from 'react'
import { intlShape, injectIntl } from 'react-intl'
import AddressSummary from '../../src/AddressSummary'

import AddressRules from '../../src/AddressRules'
import mockRules from '../../src/country/BRA'

class RulesApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      country: 'BRA',
      address1: {
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

  setBRA = () => {
    this.setState({
      country: 'BRA',
    })
  }

  setUSA = () => {
    this.setState({
      country: 'USA',
    })
  }

  setWrong = () => {
    this.setState({
      country: 'XXX',
    })
  }

  render() {
    const { address1, country } = this.state
    return (
      <div className="pa6">
        <h3>AddressRules demo:</h3>
        <button onClick={this.setBRA}>Set rule to BRA</button>
        <button onClick={this.setUSA}>Set rule to USA</button>
        <button onClick={this.setWrong}>Set rule to malformed country</button>
        <div className="mt8">
          <AddressRules
            country={country}
            fetch={country => import('../../src/country/' + country)}
          >
            <AddressSummary address={address1} />
          </AddressRules>
        </div>
      </div>
    )
  }
}

RulesApp.propTypes = {
  intl: intlShape.isRequired,
}

export default injectIntl(RulesApp)

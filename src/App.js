import React, { Component } from 'react'
import CountrySelector from './CountrySelector'
import AddressForm from './AddressForm'
import AddressSummary from './AddressSummary'
import PostalCodeGetter from './PostalCodeGetter'
import { addValidation, removeValidation } from './transforms/address'
import AddressContainer from './AddressContainer'
import Input from './addressInputs/Input'

const ACCOUNT_NAME = 'qamarketplace'

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
      rules: {},
    }
  }

  componentDidMount() {
    this.loadCurrentCountryRules()
  }

  loadCurrentCountryRules = () => {
    const country = this.state.address.country.value
    const hasRulesLoaded = this.state.rules[country]

    if (hasRulesLoaded) {
      return this.setState({ loading: false })
    }

    import('./country/' + country).then(rules => {
      this.setState(prevState => ({
        rules: { ...prevState.rules, [country]: rules.default },
      }))
    })
  };

  handleAddressChange = address => {
    this.setState(prevState => ({
      address: {
        ...prevState.address,
        ...address,
      },
    }))
  };

  componentDidUpdate(_, prevState) {
    const countryChanged =
      this.state.address.country.value !== prevState.address.country.value

    if (countryChanged) {
      this.loadCurrentCountryRules()
    }
  }

  render() {
    const { shipsTo, address, rules } = this.state

    const country = address.country.value
    const selectedRules = rules[country]
    if (!selectedRules) {
      return <div>Loading...</div>
    }

    return (
      <div className="step" style={{ padding: '20px' }}>
        <div style={{ float: 'right', width: '50%' }}>
          <pre><small>{JSON.stringify(address, null, 2)}</small></pre>
        </div>
        <div>
          <AddressContainer
            accountName={ACCOUNT_NAME}
            address={address}
            rules={selectedRules}
            onChangeAddress={this.handleAddressChange}
          >
            {onChangeAddress => (
              <div>
                <CountrySelector
                  Input={Input}
                  address={address}
                  shipsTo={shipsTo}
                  onChangeAddress={onChangeAddress}
                />

                <PostalCodeGetter
                  Input={Input}
                  address={address}
                  rules={selectedRules}
                  onChangeAddress={onChangeAddress}
                />

                <AddressForm
                  Input={Input}
                  address={address}
                  rules={selectedRules}
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

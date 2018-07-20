import React, { Component } from 'react'
import PropTypes from 'prop-types'

import AddressContainer from '../../src/AddressContainer'
import CountrySelector from '../../src/CountrySelector'
import AddressForm from '../../src/AddressForm'
import AddressSummary from '../../src/AddressSummary'
import PostalCodeGetter from '../../src/PostalCodeGetter'
import AutoCompletedFields from '../../src/AutoCompletedFields'

import {
  addValidation,
  removeValidation,
  isValidAddress,
} from '../../src/index'

import CustomInput from '../../src/CustomInput'

import GoogleMapsContainer from '../../src/geolocation/GoogleMapsContainer'
import GeolocationInput from '../../src/geolocation/GeolocationInput'
import Map from '../../src/geolocation/Map'

import { injectIntl, intlShape } from 'react-intl'
import AddressRules from '../../src/AddressRules'
import DefaultInput from '../../src/DefaultInput'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      address: addValidation({
        addressId: '10',
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
        addressQuery: null,
      }),
      rules: {},
      shipsTo: this.addCountryLabel(props.intl, props.shipsTo),
    }
  }

  addCountryLabel(intl, countries) {
    return countries.map(countryCode => ({
      label: intl.formatMessage({ id: 'country.' + countryCode }),
      value: countryCode,
    }))
  }

  handleAddressChange = address => {
    this.setState(prevState => ({
      address: {
        ...prevState.address,
        ...address,
      },
    }))
  }

  handleSubmit = e => {
    e.preventDefault()
    const rules = this.getCurrentRules(this.state)

    const { valid, address } = isValidAddress(this.state.address, rules)

    if (valid) {
      this.setState({ submitted: true, address })
      return
    }

    this.setState({ address })
  }

  render() {
    const { address, shipsTo } = this.state
    const { intl, accountName, googleMapsAPIKey, locale } = this.props
    const cleanAddress = removeValidation(address)

    if (this.state.submitted) {
      return (
        <div className="step" style={{ padding: '20px' }}>
          <AddressRules
            country={cleanAddress.country}
            fetch={country => import('../../src/country/' + country)}
          >
            <AddressSummary
              address={cleanAddress}
              onClickMaskedInfoIcon={this.handleClickMaskedInfoIcon}
            />
          </AddressRules>
        </div>
      )
    }

    const validGeoCoords =
      address.geoCoordinates &&
      address.geoCoordinates.valid &&
      address.geoCoordinates.value.length === 2

    return (
      <div className="step" style={{ padding: '20px' }}>
        <AddressRules
          country={cleanAddress.country}
          fetch={country => import('../../src/country/' + country)}
        >
          <AddressContainer
            accountName={accountName}
            address={address}
            onChangeAddress={this.handleAddressChange}
            autoCompletePostalCode={!validGeoCoords}
          >
            {onChangeAddress => (
              <div>
                <CountrySelector
                  Input={CustomInput}
                  address={address}
                  shipsTo={shipsTo}
                  onChangeAddress={onChangeAddress}
                />

                <GoogleMapsContainer apiKey={googleMapsAPIKey} locale={locale}>
                  {({ loading, googleMaps }) => (
                    <div>
                      <GeolocationInput
                        Input={DefaultInput}
                        loadingGoogle={loading}
                        googleMaps={googleMaps}
                        address={address}
                        onChangeAddress={onChangeAddress}
                      />

                      {validGeoCoords && (
                        <Map
                          loadingGoogle={loading}
                          googleMaps={googleMaps}
                          geoCoordinates={address.geoCoordinates.value}
                          onChangeAddress={onChangeAddress}
                          mapProps={{
                            style: {
                              height: '120px',
                              marginBottom: '10px',
                              width: '260px',
                            },
                          }}
                        />
                      )}
                    </div>
                  )}
                </GoogleMapsContainer>

                {!validGeoCoords && (
                  <PostalCodeGetter
                    Input={CustomInput}
                    address={address}
                    onChangeAddress={onChangeAddress}
                  />
                )}

                <AutoCompletedFields
                  address={address}
                  onChangeAddress={onChangeAddress}
                >
                  <a
                    className="link-edit"
                    id="force-shipping-fields"
                    style={{ cursor: 'pointer' }}
                  >
                    {intl.formatMessage({ id: 'address-form.edit' })}
                  </a>
                </AutoCompletedFields>

                <AddressForm
                  Input={CustomInput}
                  address={address}
                  onChangeAddress={onChangeAddress}
                  omitPostalCodeFields={!validGeoCoords}
                />
              </div>
            )}
          </AddressContainer>
        </AddressRules>

        <button className="btn btn-default" onClick={this.handleSubmit}>
          Submit
        </button>
      </div>
    )
  }
}

App.propTypes = {
  intl: intlShape,
  accountName: PropTypes.string.isRequired,
  googleMapsAPIKey: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
  shipsTo: PropTypes.array.isRequired,
}

export default injectIntl(App)

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

import {
  AddressContainer,
  AddressRules,
  CountrySelector,
  AddressForm,
  AddressSummary,
  PostalCodeGetter,
  AutoCompletedFields,
  AddressSubmitter,
  addValidation,
  removeValidation,
} from '../../react/index'

import {
  GeolocationInput,
  GoogleMapsContainer,
  Map,
} from '../../react/geolocation/index'

import Button from '@vtex/styleguide/lib/Button'
import StyleguideInput from '../../react/inputs/StyleguideInput'

import 'vtex-tachyons'

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
    const validGeoCoords =
      address.geoCoordinates &&
      address.geoCoordinates.valid &&
      address.geoCoordinates.value.length === 2

    this.setState(prevState => ({
      address: {
        ...prevState.address,
        ...address,
      },
      validGeoCoords,
    }))
  }

  handleSubmit = (valid, address) => {
    if (valid) {
      this.setState({ submitted: true, address })
    }
  }

  render() {
    const { address, shipsTo, validGeoCoords } = this.state
    const { intl, accountName, googleMapsAPIKey, locale } = this.props

    const cleanAddress = removeValidation(address)

    if (this.state.submitted) {
      return (
        <div className="step" style={{ padding: '20px' }}>
          <AddressRules
            country={cleanAddress.country}
            fetch={country => import('../../react/country/' + country)}
          >
            <AddressSummary address={cleanAddress} />
          </AddressRules>
        </div>
      )
    }

    return (
      <div className="step" style={{ padding: '20px' }}>
        <AddressRules
          country={cleanAddress.country}
          fetch={country => import('../../react/country/' + country)}
        >
          <AddressContainer
            accountName={accountName}
            address={address}
            notApplicableValue={"N/A"}
            Input={StyleguideInput}
            onChangeAddress={this.handleAddressChange}
            autoCompletePostalCode={!validGeoCoords}
          >
            <div>
              <CountrySelector shipsTo={shipsTo} />

              <GoogleMapsContainer apiKey={googleMapsAPIKey} locale={locale}>
                {({ loading, googleMaps }) => (
                  <div>
                    <GeolocationInput
                      loadingGoogle={loading}
                      googleMaps={googleMaps}
                    />

                    {validGeoCoords && (
                      <Map
                        loadingGoogle={loading}
                        googleMaps={googleMaps}
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

              {!validGeoCoords && <PostalCodeGetter />}

              <AutoCompletedFields>
                <a
                  className="link-edit"
                  id="force-shipping-fields"
                  style={{ cursor: 'pointer' }}
                >
                  {intl.formatMessage({ id: 'address-form.edit' })}
                </a>
              </AutoCompletedFields>

              <AddressForm omitPostalCodeFields={!validGeoCoords} />

              <AddressSubmitter onSubmit={this.handleSubmit}>
                {handleSubmit => (
                  <Button size="small" block onClick={handleSubmit}>
                    Submit
                  </Button>
                )}
              </AddressSubmitter>
            </div>
          </AddressContainer>
        </AddressRules>
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

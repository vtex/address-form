import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

import Button from '@vtex/styleguide/lib/Button'
import AddressContainer from '../../src/AddressContainer'
import CountrySelector from '../../src/CountrySelector'
import PostalCodeGetter from '../../src/PostalCodeGetter'
import AutoCompletedFields from '../../src/AutoCompletedFields'
import AddressForm from '../../src/AddressForm'
import CustomInput from '../../src/CustomInput'

import mockRules from '../../src/country/BRA'

class IntlApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: {
        addressType: 'residential',
        city: null,
        complement: null,
        country: 'BRA',
        neighborhood: null,
        number: null,
        postalCode: null,
        receiverName: null,
        reference: null,
        state: null,
        street: null,
        addressQuery: null,
      },
    }
  }

  render() {
    const { shipsTo, intl } = this.props
    const { address } = this.state
    return (
      <form>
        <AddressContainer
          address={address}
          rules={mockRules}
          onChangeAddress={this.handleAddressChange}
          autoCompletePostalCode
        >
          {onChangeAddress => (
            <div>
              <CountrySelector
                Input={CustomInput}
                address={address}
                shipsTo={shipsTo}
                onChangeAddress={onChangeAddress}
              />

              <PostalCodeGetter
                Input={CustomInput}
                address={address}
                rules={mockRules}
                onChangeAddress={onChangeAddress}
              />

              <AutoCompletedFields
                address={address}
                rules={mockRules}
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
                rules={mockRules}
                onChangeAddress={onChangeAddress}
              />
            </div>
          )}
        </AddressContainer>
        <Button type="submit" variation="secondary" block size="small">
          Submit
        </Button>
      </form>
    )
  }
}

IntlApp.propTypes = {
  shipsTo: PropTypes.array.isRequired,
  intl: intlShape.isRequired,
}

export default injectIntl(IntlApp)

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'

class RulesApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
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

      address2: {
        addressId: '1',
        addressType: 'residential',
        city: 'Cupertino',
        complement: 'Room 42',
        country: 'USA',
        geoCoordinates: [],
        neighborhood: null,
        number: null,
        postalCode: '95014',
        receiverName: 'Steve Jobs',
        reference: null,
        state: 'CA',
        street: '1 Infinite Loop',
        addressQuery: null,
      },
    }
  }

  render() {
    const { address1, address2 } = this.state
    return (
      <div className="flex mb10">
        <div className="w-50">Oi</div>
        <div className="w-50">Oi</div>
      </div>
    )
  }
}

RulesApp.propTypes = {
  intl: intlShape.isRequired,
}

export default injectIntl(RulesApp)

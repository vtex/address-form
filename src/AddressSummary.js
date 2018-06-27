import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShape from './propTypes/AddressShape'
import { getField } from './selectors/fields'
import { POSTAL_CODE } from './constants'

class AddressSummary extends Component {
  render() {
    if (this.props.giftRegistryDescription) {
      return (
        <span>
          <span>At address of:</span>{' '}
          <strong className="gift-list-name">
            {this.props.giftRegistryDescription}
          </strong>
        </span>
      )
    }

    const { rules, address, canEditData, children } = this.props
    const postalCodeByInput = rules.postalCodeFrom === POSTAL_CODE
    const numberField = getField('number', rules)
    const complementField = getField('complement', rules)
    const neighborhoodField = getField('neighborhood', rules)

    const {
      street,
      country,
      number,
      complement,
      neighborhood,
      city,
      state,
      postalCode,
    } = address

    return (
      <div className="address-summary">
        {street && <span className="street">{street}</span>}

        {numberField && number && <span className="number-comma">{', '}</span>}
        {numberField && number && <span className="number">{number}</span>}

        {!canEditData && ' '}
        {!canEditData && (
          <a
            data-i18n="[title]modal.maskedInfoHello"
            className="client-masked-info"
            onClick={this.props.onClickMaskedInfoIcon}
          >
            <i className="icon-question-sign" />
          </a>
        )}

        {street || number || complement ? <br /> : null}

        {complementField &&
          complement && <span className="complement">{complement}</span>}

        {neighborhood &&
          complement && <span className="neighborhood-comma">{', '}</span>}
        {neighborhoodField &&
          neighborhood && <span className="neighborhood">{neighborhood}</span>}

        {city && <span className="city-dash">{' - '}</span>}
        {city && <span className="city">{city}</span>}

        {state && <span className="state-dash">{' - '}</span>}
        {state && <span className="state">{state}</span>}

        {postalCode || country ? <br /> : null}
        {postalCodeByInput && <span className="postal-code">{postalCode}</span>}

        {country && <span className="country-dash">{' - '}</span>}
        {country && <span className="country">{country}</span>}

        {children}
      </div>
    )
  }
}

AddressSummary.defaultProps = {
  canEditData: true,
}

AddressSummary.propTypes = {
  canEditData: PropTypes.bool,
  address: AddressShape.isRequired,
  rules: PropTypes.object.isRequired,
  children: PropTypes.node,
  giftRegistryDescription: PropTypes.string,
  onClickMaskedInfoIcon: PropTypes.func,
}

export default AddressSummary

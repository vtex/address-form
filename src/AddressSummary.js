import React, { Component } from 'react'
import { injectIntl, intlShape } from 'react-intl'
import PropTypes from 'prop-types'
import AddressShape from './propTypes/AddressShape'

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

    const { rules, canEditData, address } = this.props
    const maskedInfoIcon = (
      <span>
        {' '}
        <a
          key="maskedInfoIcon"
          data-i18n="[title]modal.maskedInfoHello"
          className="client-masked-info"
          onClick={this.props.onClickMaskedInfoIcon}
        >
          <i className="icon-question-sign" />
        </a>
      </span>
    )

    return (
      <div className="address-summary">
        {rules.summary
          .map((line, index) => [
            ...line.map(
              field =>
                address[field.name] ? (
                  <span key={field.name}>
                    {field.delimiter && (
                      <span className={field.name + '-delimiter'}>
                        {field.delimiter}
                      </span>
                    )}
                    <span className={field.name}>{address[field.name]}</span>
                  </span>
                ) : null,
            ),
            index === 0 && canEditData ? maskedInfoIcon : null,
          ])
          .reduce(
            (acc, line) =>
              acc == null ? [line] : [...acc, <br key={acc.length} />, line],
          )}
        <br />
        <span key="country">
          <span className="country">
            {this.props.intl.formatMessage({ id: `country.${rules.country}` })}
          </span>
        </span>
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
  intl: intlShape.isRequired,
}

export default injectIntl(AddressSummary)

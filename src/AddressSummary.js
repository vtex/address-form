import React, { Component } from 'react'
import { injectIntl, intlShape } from 'react-intl'
import PropTypes from 'prop-types'
import AddressShape from './propTypes/AddressShape'
import defaultRules from './country/default'
import { injectRules } from './addressRulesContext'

class AddressSummary extends Component {
  render() {
    const {
      rules,
      canEditData,
      showCountry,
      address,
      children,
      onClickMaskedInfoIcon,
      giftRegistryDescription,
    } = this.props

    if (giftRegistryDescription) {
      return (
        <span>
          <span>At address of:</span>{' '}
          <strong className="gift-list-name">{giftRegistryDescription}</strong>
        </span>
      )
    }

    if (!rules.summary) {
      rules.summary = defaultRules.summary
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Summary rules not found; applying default instead.')
      }
    }

    const maskedInfoIcon = (
      <span key="maskedInfoIcon">
        {' '}
        <a
          data-i18n="[title]modal.maskedInfoHello"
          className="client-masked-info"
          onClick={onClickMaskedInfoIcon}
        >
          <i className="icon-question-sign" />
        </a>
      </span>
    )

    return (
      <div className="address-summary">
        {rules.summary
          .map((line, index) =>
            [
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
                      {field.delimiterAfter && (
                        <span className={field.name + '-delimiter-after'}>
                          {field.delimiterAfter}
                        </span>
                      )}
                    </span>
                  ) : null,
              ),
              index === 0 && !canEditData ? maskedInfoIcon : null,
            ].reduce((line, field) => {
              if (field == null) return line
              else if (line == null) return [field]
              return [...line, field]
            }, null),
          )
          .reduce((summary, line) => {
            if (line == null) return summary
            else if (summary == null) return [line]
            return [...summary, <br key={summary.length} />, line]
          }, null)}
        {showCountry &&
          rules.country && [
            <br key="break" />,
            <span key="country" className="country">
              {this.props.intl.formatMessage({
                id: `country.${rules.country}`,
                defaultMessage: rules.country,
              })}
            </span>,
          ]}
        {children}
      </div>
    )
  }
}

AddressSummary.defaultProps = {
  canEditData: true,
  showCountry: true,
}

AddressSummary.propTypes = {
  canEditData: PropTypes.bool,
  showCountry: PropTypes.bool,
  address: AddressShape.isRequired,
  rules: PropTypes.object.isRequired,
  children: PropTypes.node,
  giftRegistryDescription: PropTypes.string,
  onClickMaskedInfoIcon: PropTypes.func,
  intl: intlShape.isRequired,
}

export default injectRules(injectIntl(AddressSummary))

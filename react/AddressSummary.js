import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { injectIntl, intlShape } from './intl/utils'
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
        {
          // eslint-disable-next-line jsx-a11y/anchor-is-valid, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <a
            data-i18n="[title]modal.maskedInfoHello"
            className="client-masked-info"
            onClick={onClickMaskedInfoIcon}
          >
            <i className="icon-question-sign" />
          </a>
        }
      </span>
    )

    const country = rules.country ? rules.country : 'default'
    let lineCounter = 0

    return (
      <div className={`address-summary address-summary-${country}`}>
        {rules.summary
          .map((line, index) =>
            [
              ...line.map((field, lineIndex, summary) => {
                const hasPreviousField =
                  summary.length > 1 &&
                  lineIndex > 0 &&
                  address[summary[lineIndex - 1].name]

                const hasNextField =
                  lineIndex + 1 < summary.length &&
                  address[summary[lineIndex + 1].name]

                const hasDifferentDelimiter = field.delimiterAfter !== '-'
                const shouldShowDelimiter =
                  hasNextField || hasDifferentDelimiter

                return address[field.name] ? (
                  <span key={field.name}>
                    {field.delimiter && hasPreviousField && (
                      <span className={`${field.name}-delimiter`}>
                        {field.delimiter}
                      </span>
                    )}
                    <span className={field.name}>{address[field.name]}</span>
                    {field.delimiterAfter && shouldShowDelimiter && (
                      <span className={`${field.name}-delimiter-after`}>
                        {field.delimiterAfter}
                      </span>
                    )}
                  </span>
                ) : null
              }),
              index === 0 && !canEditData ? maskedInfoIcon : null,
            ].reduce((total, field) => {
              if (field == null) return total
              if (total == null) return [field]

              return [...total, field]
            }, null)
          )
          .reduce((summary, line) => {
            if (line == null) return summary
            if (summary == null) return [line]
            lineCounter++

            return [
              ...summary,
              <br
                className={`line${lineCounter}-delimiter`}
                key={summary.length}
              />,
              line,
            ]
          }, null)}
        {showCountry &&
          rules.country && [
            <br className={`line${lineCounter + 1}-delimiter`} key="break" />,
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

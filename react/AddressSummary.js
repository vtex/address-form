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
    const country = rules.country ? rules.country : 'default'
    let lineCounter = 0

    return (
      <div className={`address-summary address-summary-${country}`}>
        {rules.summary
          .map((line, index) => [
            ...line.map((field, index, summary) => {
              const hasPreviousField = summary.length > 1 &&
                index > 0 &&
                address[summary[index - 1].name]

              const hasNextField = index + 1 < summary.length &&
                address[summary[index + 1].name]

              return address[field.name]
                ? <span key={field.name}>
                  {field.delimiter &&
                      hasPreviousField &&
                      <span className={field.name + '-delimiter'}>
                        {field.delimiter}
                      </span>}
                  <span className={field.name}>{address[field.name]}</span>
                  {field.delimiterAfter &&
                      hasNextField &&
                      <span className={field.name + '-delimiter-after'}>
                        {field.delimiterAfter}
                      </span>}
                </span>
                : null
            }),
            index === 0 && !canEditData ? maskedInfoIcon : null,
          ].reduce(
            (line, field) => {
              if (field == null) return line
              else if (line == null) return [field]
              return [...line, field]
            },
            null
          ))
          .reduce(
            (summary, line) => {
              if (line == null) return summary
              else if (summary == null) return [line]
              lineCounter++
              return [...summary, <br className={'line' + lineCounter + '-delimiter'} key={summary.length} />, line]
            },
            null
          )}
        {showCountry &&
        rules.country && [
          <br className={'line' + (lineCounter + 1) + '-delimiter'} key="break" />,
          (
            <span key="country" className="country">
            {this.props.intl.formatMessage({
                id: `country.${rules.country}`,
                defaultMessage: rules.country,
              })}
          </span>
          ),
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

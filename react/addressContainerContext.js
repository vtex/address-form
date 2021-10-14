import React from 'react'
import PropTypes from 'prop-types'

import AddressShapeWithValidation from './propTypes/AddressShapeWithValidation'

export const AddressContext = React.createContext({})

export const REQUIRED_INDICATORS = {
  OPTIONAL_PLACEHOLDER: 'optional-placeholder',
  ASTERISK_ON_LABEL: 'asterisk-on-label',
}

const DEFAULT_ADDRESS_STYLE_RULES = {
  requiredIndicator: REQUIRED_INDICATORS.OPTIONAL_PLACEHOLDER,
}

/* eslint-disable react/prop-types */
export function injectAddressContext(Component) {
  return function AddressInjectedComponent(props) {
    if (props.address || props.onChangeAddress) {
      return <Component {...props} />
    }

    return (
      <AddressContext.Consumer>
        {(ctx) => {
          const addressStyleRules = {
            ...DEFAULT_ADDRESS_STYLE_RULES,
            ...(props.addressStyleRules ?? ctx.addressStyleRules),
          }

          return (
            <Component
              {...props}
              address={props.address ?? ctx.address}
              addressStyleRules={addressStyleRules}
              onChangeAddress={props.onChangeAddress ?? ctx.handleAddressChange}
              Input={props.Input ?? ctx.Input}
            />
          )
        }}
      </AddressContext.Consumer>
    )
  }
}

export const addressContextPropTypes = {
  address: AddressShapeWithValidation,
  addressStyleRules: PropTypes.shape({
    requiredIndicator: PropTypes.oneOf(Object.values(REQUIRED_INDICATORS)),
  }),
  Input: PropTypes.func,
  onChangeAddress: PropTypes.func,
}

import React, { useContext } from 'react'

import type { AddressWithValidation } from './types/address'

type Context = {
  address: AddressWithValidation
  handleAddressChange: (address: AddressWithValidation) => void
  Input: React.ComponentType
  contactInfo?: any
  handleContactInfoChange?: any
  handleCompleteOmnishipping?: any
}

export const AddressContext = React.createContext<Context | undefined>(
  undefined
)

/* eslint-disable react/prop-types */
export function injectAddressContext<T>(
  Component: React.ComponentType<T & Partial<Context>>
) {
  return function AddressInjectedComponent(props: T & Partial<Context>) {
    if ('address' in props || 'onChangeAddress' in props) {
      return <Component {...props} />
    }

    return (
      <AddressContext.Consumer>
        {(ctx) => (
          <Component
            {...props}
            address={ctx?.address}
            contactInfo={ctx?.contactInfo}
            onChangeAddress={ctx?.handleAddressChange}
            onChangeContactInfo={ctx?.handleContactInfoChange}
            handleCompleteOmnishipping={ctx?.handleCompleteOmnishipping}
            Input={props.Input || ctx?.Input}
          />
        )}
      </AddressContext.Consumer>
    )
  }
}

import React from 'react'

export const AddressContext = React.createContext()

/* eslint-disable react/prop-types */
export function injectAddressContext(Component) {
  return function AddressInjectedComponent(props) {
    if (props.address || props.onChangeAddress) return <Component {...props} />

    return (
      <AddressContext.Consumer>
        {ctx => (
          <Component
            {...props}
            address={ctx.address}
            onChangeAddress={ctx.handleAddressChange}
            Input={props.Input || ctx.Input}
          />
        )}
      </AddressContext.Consumer>
    )
  }
}

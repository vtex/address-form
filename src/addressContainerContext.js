import React from 'react'

export const AddressContext = React.createContext()

export function injectAddressContext(Component) {
  return function AddressInjectedComponent(props) {
    // eslint-disable-next-line react/prop-types
    if (props.address || props.onChangeAddress) return <Component {...props} />

    return (
      <AddressContext.Consumer>
        {ctx => (
          <Component
            {...props}
            address={ctx.address}
            onChangeAddress={ctx.handleAddressChange}
            Input={ctx.Input}
          />
        )}
      </AddressContext.Consumer>
    )
  }
}

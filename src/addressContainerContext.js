import React from 'react'

export const AddressContext = React.createContext()

export function injectAddress(Component) {
  return function AddressInjectedComponent(props) {
    // eslint-disable-next-line react/prop-types
    if (props.address) return <Component {...props} />

    return (
      <AddressContext.Consumer>
        {ctx => (
          <Component
            {...props}
            address={ctx.address}
            onChangeAddress={ctx.handleAddressChange}
          />
        )}
      </AddressContext.Consumer>
    )
  }
}

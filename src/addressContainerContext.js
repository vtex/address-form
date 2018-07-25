import React from 'react'

export const AddressContext = React.createContext()

export function injectAddressContext(Component) {
  return function AddressInjectedComponent(props) {
    // eslint-disable-next-line react/prop-types
    if (props.address || props.onChangeAddress || props.onSubmit)
      return <Component {...props} />

    return (
      <AddressContext.Consumer>
        {ctx => (
          <Component
            {...props}
            address={ctx.address}
            onChangeAddress={ctx.handleAddressChange}
            onSubmit={ctx.handleSubmit}
            Input={ctx.Input}
          />
        )}
      </AddressContext.Consumer>
    )
  }
}

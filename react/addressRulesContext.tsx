import React from 'react'

import type { PostalCodeRules } from './types/rules'

export const RulesContext = React.createContext<PostalCodeRules | undefined>(
  undefined
)

export function useAddressRules() {
  const contextValue = React.useContext(RulesContext)

  if (contextValue === undefined) {
    throw new Error(
      'Hook useAddressRules should be used under <AddressRules /> component'
    )
  }

  return contextValue
}

export function injectRules<T>(
  Component: React.ComponentType<T & { rules?: PostalCodeRules }>
) {
  return function RulesInjectedComponent(
    props: T & { rules?: PostalCodeRules }
  ) {
    // eslint-disable-next-line react/prop-types
    if (props.rules) return <Component {...props} rules={props.rules} />

    return (
      <RulesContext.Consumer>
        {(rules) => <Component {...props} rules={rules} />}
      </RulesContext.Consumer>
    )
  }
}

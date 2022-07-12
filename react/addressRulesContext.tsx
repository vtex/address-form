import React from 'react'

import type { Rules } from './types/rules'

export const RulesContext = React.createContext<Rules | undefined>(undefined)

export function injectRules<T>(
  Component: React.ComponentType<T & { rules?: Rules }>
) {
  return function RulesInjectedComponent(props: T & { rules?: Rules }) {
    // eslint-disable-next-line react/prop-types
    if (props.rules) return <Component {...props} rules={props.rules} />

    return (
      <RulesContext.Consumer>
        {(rules) => <Component {...props} rules={rules} />}
      </RulesContext.Consumer>
    )
  }
}

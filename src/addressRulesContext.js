import React from 'react'

export const RulesContext = React.createContext()

export function injectRules(Component) {
  return function InjectedComponent(props) {
    return (
      <RulesContext.Consumer>
        {rules => <Component {...props} rules={rules} />}
      </RulesContext.Consumer>
    )
  }
}

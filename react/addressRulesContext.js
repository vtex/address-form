import React from 'react'

export const RulesContext = React.createContext()

export function injectRules(Component) {
  return function RulesInjectedComponent(props) {
    // eslint-disable-next-line react/prop-types
    if (props.rules) return <Component {...props} />

    return (
      <RulesContext.Consumer>
        {({ rules, loadingRules } = {}) => <Component {...props} rules={rules} loadingRules={loadingRules} />}
      </RulesContext.Consumer>
    )
  }
}

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { RulesContext } from './addressRulesContext'

import defaultRules from './country/default'

class AddressRules extends Component {
  constructor(props) {
    super(props)
    this.state = {
      country: null,
      rules: null,
    }
  }

  componentDidMount() {
    return this.updateRules()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.country !== this.props.country) {
      return this.updateRules()
    }
  }

  updateRules() {
    const { country, fetch } = this.props

    return fetch(country)
      .then(rules => {
        this.setState({
          rules: rules.default,
        })
        return rules.default
      })
      .catch(error => {
        const errorType = this.parseError(error)
        if (errorType) {
          console.warn(
            `Couldn't load rules for country ${errorType}, using default rules instead.`,
          )
          this.setState({
            rules: defaultRules,
          })
          return defaultRules
        }
        console.warn('An unknown error occurred.')
      })
  }

  parseError(e) {
    const regex = new RegExp(/Cannot find module '\.\/[a-z]*\/?([A-z-]{1,7})'/)
    const result = regex.exec(e.message)
    if (!result) return false
    return result[1]
  }

  render() {
    const { children } = this.props
    const { rules } = this.state

    return rules ? (
      <RulesContext.Provider value={rules}>{children}</RulesContext.Provider>
    ) : null
  }
}

AddressRules.propTypes = {
  children: PropTypes.any.isRequired,
  country: PropTypes.string.isRequired,
  fetch: PropTypes.func.isRequired,
}

export default AddressRules

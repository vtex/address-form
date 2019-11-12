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
    const { shouldUseIOFetching, fetch, country } = this.props

    const rulePromise = shouldUseIOFetching
      ? import(`./country/${country}`)
      : fetch(country)
    return this.fetchRules(rulePromise)
  }

  async fetchRules(rulePromise) {
    try {
      const ruleData = await rulePromise
      const rules = ruleData.default || ruleData
      this.setState({ rules })
      return rules
    } catch (error) {
      const errorType = this.parseError(error)
      if (errorType) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(
            `Couldn't load rules for country ${errorType}, using default rules instead.`,
          )
        }
        this.setState({ rules: defaultRules })
        return defaultRules
      }
      if (process.env.NODE_ENV !== 'production') {
        console.warn('An unknown error occurred.')
      }
    }
  }

  parseError(e) {
    const regex = new RegExp(/Cannot find module '\.\/[a-z]*\/?([A-z-]{1,7})'/)
    const result = regex.exec(e.message)
    if (!result) return false
    return result[1]
  }

  render() {
    const { children, useGeolocation } = this.props
    const { rules } = this.state

    if (!rules) return null

    // if using geolocation, overwrite field configs defined on `rules.geolocation`
    if (useGeolocation && rules.geolocation) {
      rules.fields = rules.fields.map(field => {
        if (rules.geolocation[field.name]) {
          // ignore unrelated props for the field
          // eslint-disable-next-line no-unused-vars
          const { valueIn, types, handler, ...props } = rules.geolocation[
            field.name
          ]
          return { ...field, ...props }
        }
        return field
      })
    }

    return (
      <RulesContext.Provider value={rules}>{children}</RulesContext.Provider>
    )
  }
}

AddressRules.propTypes = {
  children: PropTypes.any.isRequired,
  country: PropTypes.string.isRequired,
  fetch: PropTypes.func,
  /** Whether to use IO built-in file fetching */
  shouldUseIOFetching: PropTypes.bool,
  /** Whether the rules should contemplate the geolocation field rules */
  useGeolocation: PropTypes.bool,
}

export default AddressRules

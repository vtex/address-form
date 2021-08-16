import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { RulesContext } from './addressRulesContext'

import defaultRules from './country/default'

const MODULE_NOT_FOUND_PATTERN = /Cannot find module '\.\/[a-z]*\/?([A-z-]{1,7})'/

class AddressRules extends Component {
  constructor(props) {
    super(props)
    this.state = {
      country: null,
      rules: null,
      loadingRules: false,
      error: null,
    }
  }

  componentDidMount() {
    return this.updateRules()
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.country !== this.props.country ||
      prevProps.useGeolocation !== this.props.useGeolocation
    ) {
      return this.updateRules()
    }
  }

  parseError(e) {
    const result = MODULE_NOT_FOUND_PATTERN.exec(e.message)
    if (!result) return false
    return result[1]
  }

  fetchRules(rulePromise) {
    this.setState({ loadingRules: true })
    return rulePromise
      .then((ruleData) => {
        this.setState({ error: null })
        return ruleData.default || ruleData
      })
      .catch((error) => {
        this.setState({ error })
        const errorType = this.parseError(error)

        if (errorType || this.props.useDefaultRulesAsFallback) {
          if (process.env.NODE_ENV !== 'production') {
            console.warn(
              `Couldn't load rules for country ${errorType}, using default rules instead.`,
            )
          }
          return defaultRules
        }

        if (process.env.NODE_ENV !== 'production') {
          console.error('An unknown error occurred.', error)
        }
      })
      .finally(() => {
        this.setState({ loadingRules: false })
      })
  }

  async updateRules() {
    const { shouldUseIOFetching, fetch, country, useGeolocation } = this.props

    const rulePromise = shouldUseIOFetching
      ? import(`./country/${country}`)
      : fetch(country)

    let rules = await this.fetchRules(rulePromise)

    if (useGeolocation && rules.geolocation) {
      rules = {
        ...rules,
        // set a hidden flag for internal usage
        _usingGeolocationRules: true,
        // overwrite field with configs defined on `rules.geolocation`
        fields: rules.fields.map((field) => {
          if (rules.geolocation[field.name]) {
            // ignore unrelated props for the field
            // eslint-disable-next-line no-unused-vars
            const { valueIn, types, handler, ...props } = rules.geolocation[
              field.name
            ]
            return { ...field, ...props }
          }
          return field
        }),
      }
    }

    this.setState({ rules })
    return rules
  }

  render() {
    const { children } = this.props
    const { rules, loadingRules, error } = this.state

    if (!rules) return null

    return (
      <RulesContext.Provider
        value={{
          rules,
          loadingRules,
          fetchRules: this.updateRules.bind(this),
          rulesError: error,
        }}
      >
        {children}
      </RulesContext.Provider>
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
  /** Whether to always use the default rules as fallback or not */
  useDefaultRulesAsFallback: PropTypes.bool,
}

export default AddressRules

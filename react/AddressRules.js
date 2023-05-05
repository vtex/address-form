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
        const notFoundErrorType = this.parseError(error)

        if (notFoundErrorType) {
          if (process.env.NODE_ENV !== 'production') {
            console.warn(
              `Couldn't load rules for country ${notFoundErrorType}, using default rules instead.`
            )
          }

          return defaultRules
        }

        if (process.env.NODE_ENV !== 'production') {
          console.error('An unknown error occurred.', error)
        }

        if (this.props.useDefaultRulesAsFallback) {
          // Since not found rules can happen quite frequently,
          // only unexpected errors should notify the consumers.
          this.setState({ error })

          return defaultRules
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
            const {
              valueIn,
              types,
              handler,
              ...geolocationProps
            } = rules.geolocation[field.name]

            return {
              name: field.name,
              label: 'label' in field ? field.label : undefined,
              fixedLabel: 'fixedLabel' in field ? field.fixedLabel : undefined,
              required: false,
              ...geolocationProps,
            }
          }

          return field
        }),
      }
    }

    if (this.props.onLoadRules) {
      this.props.onLoadRules({ rules })
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
  /** Callback function when the address rules are loaded */
  onLoadRules: PropTypes.func,
}

export default AddressRules

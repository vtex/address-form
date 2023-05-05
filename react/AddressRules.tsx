import React, { Component } from 'react'
import PropTypes from 'prop-types'
import type { PostalCodeRules } from 'types/rules'

import { RulesContext } from './addressRulesContext'
import defaultRules from './country/default'

const pathSegment = '(?:\\.|\\.\\.|[\\w\\d\\s.-]+)'

const MODULE_NOT_FOUND_PATTERN = new RegExp(
  `Cannot find module '(${pathSegment}(?:(?:\\/|\\\\)${pathSegment})*)'`
)

const propTypes = {
  children: PropTypes.any.isRequired,
  country: PropTypes.string.isRequired,
  fetch: PropTypes.func,
  /** Whether to use IO built-in file fetching */
  shouldUseIOFetching: PropTypes.bool,
  /** Whether the rules should contemplate the geolocation field rules */
  useGeolocation: PropTypes.bool,
}

interface State {
  country: string | null
  rules: PostalCodeRules | null
}

type Props = PropTypes.InferProps<typeof propTypes>

class AddressRules extends Component<Props, State> {
  public static propTypes = propTypes

  constructor(props: Props) {
    super(props)
    this.state = {
      country: null,
      rules: null,
    }
  }

  public componentDidMount() {
    this.updateRules()
  }

  public componentDidUpdate(prevProps: Props) {
    if (
      prevProps.country !== this.props.country ||
      prevProps.useGeolocation !== this.props.useGeolocation
    ) {
      this.updateRules()
    }
  }

  private parseError(e: Error) {
    const result = MODULE_NOT_FOUND_PATTERN.exec(e.message)

    if (!result) return false

    const countryName = result[1].split('/').pop()

    return countryName
  }

  private fetchRules(
    rulePromise: Promise<PostalCodeRules | { default: PostalCodeRules }>
  ) {
    return rulePromise
      .then((ruleData) => ('default' in ruleData ? ruleData.default : ruleData))
      .catch((error) => {
        const errorType = this.parseError(error)

        if (errorType) {
          if (process.env.NODE_ENV !== 'production') {
            console.warn(
              `Couldn't load rules for country ${errorType}, using default rules instead.`
            )
          }

          return defaultRules
        }

        if (process.env.NODE_ENV !== 'production') {
          console.error('An unknown error occurred.', error)
        }

        return null
      })
  }

  private async updateRules() {
    const { shouldUseIOFetching, fetch, country, useGeolocation } = this.props

    const rulePromise =
      shouldUseIOFetching || !fetch
        ? import(`./country/${country}`)
        : fetch(country)

    let rules:
      | (PostalCodeRules & {
          _usingGeolocationRules?: boolean
        })
      | null = await this.fetchRules(rulePromise)

    const geolocationRules = rules?.geolocation

    if (useGeolocation && rules != null && geolocationRules != null) {
      rules = {
        ...rules,
        // set a hidden flag for internal usage
        _usingGeolocationRules: true,
        // overwrite field with configs defined on `rules.geolocation`
        fields: rules.fields.map((field) => {
          if (geolocationRules[field.name]) {
            // ignore unrelated props for the field
            const {
              valueIn,
              types,
              handler,
              ...geolocationProps
            } = geolocationRules[field.name]

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

    this.setState({ rules })
  }

  public render() {
    const { children } = this.props
    const { rules } = this.state

    if (!rules) return null

    return (
      <RulesContext.Provider value={rules}>{children}</RulesContext.Provider>
    )
  }
}

export default AddressRules

import { Component } from 'react'
import PropTypes from 'prop-types'

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
    this.updateRules()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.country !== this.props.country) {
      this.updateRules()
    }
  }

  updateRules() {
    const { country, fetch } = this.props

    fetch(country)
      .then(rules => {
        this.setState(prevState => ({
          rules: rules.default,
        }))
      })
      .catch(error => {
        const errorType = this.parseError(error)
        if (errorType) {
          console.warn(
            `Couldn't load rules for country ${errorType}, using default rules instead.`,
          )
          this.setState(prevState => ({
            rules: defaultRules,
          }))
        } else {
          console.warn('An unknown error occurred.')
        }
      })
  }

  parseError(e) {
    const regex = new RegExp(/Cannot find module '\.\/([A-z-]{1,7})\'\./)
    const result = regex.exec(e.message)
    if (!result) return false
    return result[1]
  }

  render() {
    const { children } = this.props
    const { rules } = this.state

    return rules ? children(rules) : null
  }
}

AddressRules.propTypes = {
  children: PropTypes.func.isRequired,
  country: PropTypes.string.isRequired,
  fetch: PropTypes.func.isRequired,
}

export default AddressRules

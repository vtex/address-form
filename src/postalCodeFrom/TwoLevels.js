import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShape from '../propTypes/AddressShape'
import find from 'lodash/find'
import map from 'lodash/map'

class TwoLevels extends Component {
  constructor(props) {
    super(props)

    this.state = getLevels(props.rules)
  }

  componentWillReceiveProps(nextProps) {
    this.setState(getLevels(nextProps.rules))
  }

  handleFirstLevelChange = e => {
    const value = e.target.value

    this.props.onChangeAddress({
      ...this.props.address,
      [this.state.firstLevel.name]: value,
    })
  };

  handleSecondLevelChange = e => {
    const value = e.target.value

    this.props.onChangeAddress({
      ...this.props.address,
      ...this.deComposeValue(value),
    })
  };

  composeValue = address =>
    (address[this.state.secondLevel.name] && address.postalCode
      ? `${address[this.state.secondLevel.name]}___${address.postalCode}`
      : '');

  deComposeValue = value => {
    const [field, postalCode] = value.split('___')
    return { [this.state.secondLevel.name]: field, postalCode }
  };

  render() {
    const { address, rules } = this.props
    const { firstLevel, secondLevel } = this.state

    return (
      <div>
        <label>
          {firstLevel.label}
          <select
            name={firstLevel.name}
            value={address[firstLevel.name] || ''}
            onChange={this.handleFirstLevelChange}
          >
            <option value="" />
            {firstLevel.options.map(level => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </label>
        <label>
          {secondLevel.label}
          <select
            name={secondLevel.name}
            value={this.composeValue(address)}
            onChange={this.handleSecondLevelChange}
          >
            <option value="" />
            {address[firstLevel.name] &&
              rules.secondLevelPostalCodes[address[firstLevel.name]]
              ? map(rules.secondLevelPostalCodes[address[firstLevel.name]], ({
                  postalCode,
                  secondLevelName,
                }) => (
                  <option
                    key={secondLevelName}
                    value={this.composeValue({
                      [secondLevel.name]: secondLevelName,
                      postalCode,
                    })}
                  >
                    {secondLevelName}
                  </option>
                ))
              : null}
          </select>
        </label>
      </div>
    )
  }
}

function getLevels(rules) {
  const firstLevel = find(
    rules.fields,
    ({ name }) => name === rules.postalCodeLevels[0]
  )
  const secondLevel = find(
    rules.fields,
    ({ name }) => name === rules.postalCodeLevels[1]
  )

  return { firstLevel, secondLevel }
}

TwoLevels.propTypes = {
  address: PropTypes.shape(AddressShape),
  rules: PropTypes.object.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
}

export default TwoLevels

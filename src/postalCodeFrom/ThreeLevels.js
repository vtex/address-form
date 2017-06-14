import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShape from '../propTypes/AddressShape'
import find from 'lodash/find'
import map from 'lodash/map'

class ThreeLevels extends Component {
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
      [this.state.secondLevel.name]: value,
    })
  };

  handleThirdLevelChange = e => {
    const value = e.target.value

    this.props.onChangeAddress({
      ...this.props.address,
      ...this.deComposeValue(value),
    })
  };

  composeValue = address =>
    (address[this.state.thirdLevel.name] && address.postalCode
      ? `${address[this.state.thirdLevel.name]}___${address.postalCode}`
      : '');

  deComposeValue = value => {
    const [thirdLevelValue, postalCode] = value.split('___')
    return { [this.state.thirdLevel.name]: thirdLevelValue, postalCode }
  };

  render() {
    const { address, rules } = this.props
    const { firstLevel, secondLevel, thirdLevel } = this.state

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
            {firstLevel.options.map(firstLevelName => (
              <option key={firstLevelName} value={firstLevelName}>
                {firstLevelName}
              </option>
            ))}
          </select>
        </label>
        <label>
          {secondLevel.label}
          <select
            name={secondLevel.name}
            value={address[secondLevel.name] || ''}
            onChange={this.handleSecondLevelChange}
          >
            <option value="" />
            {address[firstLevel.name] &&
              secondLevel.optionsMap[address[firstLevel.name]]
              ? map(
                  secondLevel.optionsMap[address[firstLevel.name]],
                  secondLevelName => (
                    <option key={secondLevelName} value={secondLevelName}>
                      {secondLevelName}
                    </option>
                  )
                )
              : null}
          </select>
        </label>

        <label>
          {thirdLevel.label}
          <select
            name={thirdLevel.name}
            value={this.composeValue(address)}
            onChange={this.handleThirdLevelChange}
          >
            <option value="" />
            {address[firstLevel.name] &&
              address[secondLevel.name] &&
              rules.thirdLevelPostalCodes[address[firstLevel.name]] &&
              rules.thirdLevelPostalCodes[address[firstLevel.name]][
                address[secondLevel.name]
              ]
              ? map(
                  rules.thirdLevelPostalCodes[address[firstLevel.name]][
                    address[secondLevel.name]
                  ],
                  ({ postalCode, thirdLevelName }) => (
                    <option
                      key={thirdLevelName}
                      value={this.composeValue({
                        [thirdLevel.name]: thirdLevelName,
                        postalCode,
                      })}
                    >
                      {thirdLevelName}
                    </option>
                  )
                )
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
  const thirdLevel = find(
    rules.fields,
    ({ name }) => name === rules.postalCodeLevels[2]
  )

  return { firstLevel, secondLevel, thirdLevel }
}

ThreeLevels.propTypes = {
  address: PropTypes.shape(AddressShape),
  rules: PropTypes.object.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
}

export default ThreeLevels

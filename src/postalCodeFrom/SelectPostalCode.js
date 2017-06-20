import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation
  from '../propTypes/AddressShapeWithValidation'
import { getField } from '../selectors/fields'
import find from 'lodash/find'
import map from 'lodash/map'
import { ONE_LEVEL, TWO_LEVELS, THREE_LEVELS } from '../constants'
import InputLabel from '../addressInputs/InputLabel'

class SelectPostalCode extends Component {
  constructor(props) {
    super(props)

    this.state = getLevels(props.rules)
  }

  componentWillReceiveProps(nextProps) {
    this.setState(getLevels(nextProps.rules))
  }

  handleChange = e => {
    const value = e.target.value
    const rules = this.props.rules
    const currentLevelName = this.getCurrentLevelField(rules).name

    this.props.onChangeAddress({
      ...this.deComposeValue(currentLevelName, value),
    })
  };

  getCurrentLevelField(rules) {
    switch (rules.postalCodeFrom) {
      case ONE_LEVEL:
        return this.state.levels[0]
      case TWO_LEVELS:
        return this.state.levels[1]
      default:
      case THREE_LEVELS:
        return this.state.levels[2]
    }
  }

  composeValue = (currentLevelName, address) =>
    (address[currentLevelName] &&
      address[currentLevelName].value &&
      address.postalCode &&
      address.postalCode.value
      ? `${address[currentLevelName].value}___${address.postalCode.value}`
      : '');

  deComposeValue = (currentLevelName, value) => {
    const [field, postalCode] = value.split('___')
    return {
      [currentLevelName]: { value: field },
      postalCode: { value: postalCode },
    }
  };

  getPostalCodeOptions = () => {
    const { address, rules } = this.props

    switch (rules.postalCodeFrom) {
      case ONE_LEVEL:
        return this.getFirstLevelPostalCodes(address, rules)
      case TWO_LEVELS:
        return this.getSecondLevelPostalCodes(address, rules)
      default:
      case THREE_LEVELS:
        return this.getThirdLevelPostalCodes(address, rules)
    }
  };

  getFirstLevelPostalCodes(address, rules) {
    return rules.firstLevelPostalCodes
  }

  getSecondLevelPostalCodes(address, rules) {
    const firstLevel = getField(rules.postalCodeLevels[0], rules)

    return address[firstLevel.name] &&
      address[firstLevel.name].value &&
      rules.secondLevelPostalCodes[address[firstLevel.name].value]
      ? rules.secondLevelPostalCodes[address[firstLevel.name].value]
      : []
  }

  getThirdLevelPostalCodes(address, rules) {
    const firstLevel = getField(rules.postalCodeLevels[0], rules)
    const secondLevel = getField(rules.postalCodeLevels[1], rules)

    return address[firstLevel.name] &&
      address[firstLevel.name].value &&
      address[secondLevel.name] &&
      address[secondLevel.name].value &&
      rules.thirdLevelPostalCodes[address[firstLevel.name].value] &&
      rules.thirdLevelPostalCodes[address[firstLevel.name].value][
        address[secondLevel.name].value
      ]
      ? rules.thirdLevelPostalCodes[address[firstLevel.name].value][
          address[secondLevel.name].value
        ]
      : []
  }

  render() {
    const { address, rules } = this.props
    const currentLevelField = this.getCurrentLevelField(rules)
    const currentLevelName = currentLevelField.name

    return (
      <InputLabel field={currentLevelField}>
        <select
          name={currentLevelName}
          value={this.composeValue(currentLevelName, address)}
          onChange={this.handleChange}
        >
          <option value="" />
          {map(this.getPostalCodeOptions(), ({ postalCode, label }) => (
            <option
              key={label}
              value={this.composeValue(currentLevelName, {
                [currentLevelName]: { value: label },
                postalCode: { value: postalCode },
              })}
            >
              {label}
            </option>
          ))}
        </select>
      </InputLabel>
    )
  }
}

function getLevels(rules) {
  let firstLevel, secondLevel, thirdLevel

  if (rules.postalCodeLevel || rules.postalCodeLevels.length >= 1) {
    firstLevel = find(
      rules.fields,
      ({ name }) =>
        name === (rules.postalCodeLevel || rules.postalCodeLevels[0])
    )
  }

  if (rules.postalCodeLevels && rules.postalCodeLevels.length >= 2) {
    secondLevel = find(
      rules.fields,
      ({ name }) => name === rules.postalCodeLevels[1]
    )
  }

  if (rules.postalCodeLevels && rules.postalCodeLevels.length >= 3) {
    thirdLevel = find(
      rules.fields,
      ({ name }) => name === rules.postalCodeLevels[2]
    )
  }

  return {
    levels: [firstLevel, secondLevel, thirdLevel],
  }
}

SelectPostalCode.propTypes = {
  address: PropTypes.shape(AddressShapeWithValidation).isRequired,
  rules: PropTypes.object.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
}

export default SelectPostalCode

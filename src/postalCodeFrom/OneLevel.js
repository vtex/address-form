import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShape from '../propTypes/AddressShape'
import find from 'lodash/find'

class OneLevel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      levelField: getLevelField(props.rules),
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      levelField: getLevelField(nextProps.rules),
    })
  }

  handleChange = e => {
    const value = e.target.value

    this.props.onChangeAddress({
      ...this.props.address,
      ...this.deComposeValue(value),
    })
  };

  composeValue = address =>
    (address[this.state.levelField.name] && address.postalCode
      ? `${address[this.state.levelField.name]}___${address.postalCode}`
      : '');

  deComposeValue = value => {
    const [levelValue, postalCode] = value.split('___')
    return { [this.state.levelField.name]: levelValue, postalCode }
  };

  render() {
    const { address, rules } = this.props
    const { levelField } = this.state

    return (
      <div>
        <label>
          {levelField.label}
          <select
            name={levelField.name}
            value={this.composeValue(address) || ''}
            onChange={this.handleChange}
          >
            <option value="" />
            {rules.firstLevelPostalCodes.map(({
              postalCode,
              firstLevelName,
            }) => (
              <option
                key={firstLevelName}
                value={this.composeValue({
                  [levelField.name]: firstLevelName,
                  postalCode,
                })}
              >
                {firstLevelName}
              </option>
            ))}
          </select>
        </label>
      </div>
    )
  }
}

function getLevelField(rules) {
  const levelField = find(
    rules.fields,
    ({ name }) => name === rules.postalCodeLevel
  )

  return levelField
}

OneLevel.propTypes = {
  address: PropTypes.shape(AddressShape),
  rules: PropTypes.object.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
}

export default OneLevel

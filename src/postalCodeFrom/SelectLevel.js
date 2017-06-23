import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation
  from '../propTypes/AddressShapeWithValidation'
import InputSelect from '../addressInputs/InputSelect'
import InputLabel from '../addressInputs/InputLabel'
import {
  getField,
  getListOfOptions,
  getDependentFields,
} from '../selectors/fields'
import reduce from 'lodash/reduce'

class SelectLevel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      field: this.getLevelField(props),
    }
  }

  getLevelField({ level, rules }) {
    return getField(rules.postalCodeLevels[level], rules)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ field: this.getLevelField(nextProps) })
  }

  handleChange = value => {
    const { field: { name } } = this.state
    const { rules } = this.props

    const dependentFields = getDependentFields(name, rules)

    const cleanAddress = reduce(
      this.props.address,
      (cleanAddress, value, prop) => {
        if (dependentFields.indexOf(prop) !== -1) {
          cleanAddress[prop] = { value: null }
        }
        return cleanAddress
      },
      {}
    )

    this.props.onChangeAddress({
      ...cleanAddress,
      [name]: {
        ...cleanAddress[name],
        value,
      },
    })
  };

  handleBlur = () => {
    const { field } = this.state
    const { address, onChangeAddress } = this.props

    onChangeAddress({
      [field.name]: {
        ...address[field.name],
        visited: true,
      },
    })
  };

  render() {
    const { field } = this.state
    const { rules, address } = this.props

    return (
      <InputLabel field={field}>
        <InputSelect
          field={field}
          address={address}
          options={getListOfOptions(field, address, rules)}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
      </InputLabel>
    )
  }
}

SelectLevel.propTypes = {
  level: PropTypes.oneOf([0, 1]),
  address: PropTypes.shape(AddressShapeWithValidation),
  rules: PropTypes.object.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
}

export default SelectLevel

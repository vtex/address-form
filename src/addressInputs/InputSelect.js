import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShape from '../propTypes/AddressShape'
import map from 'lodash/map'

class InputSelect extends Component {
  handleChange = e => {
    const value = e.target.value

    this.props.onChange({
      ...this.props.address,
      [this.props.field.name]: value,
    })
  };

  render() {
    const { address, field } = this.props

    return (
      <select
        name={field.name}
        value={address[field.name] || ''}
        onChange={this.handleChange}
      >
        <option value="" />
        {field.options &&
          map(field.options, optionValue => (
            <option key={optionValue} value={optionValue}>{optionValue}</option>
          ))}
        {field.optionsPairs &&
          map(field.optionsPairs, ({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        {field.optionsMap &&
          map(field.optionsMap[address[field.basedOn]], optionValue => (
            <option key={optionValue} value={optionValue}>{optionValue}</option>
          ))}
      </select>
    )
  }
}

InputSelect.propTypes = {
  field: PropTypes.object.isRequired,
  address: PropTypes.shape(AddressShape),
  onChange: PropTypes.func.isRequired,
}

export default InputSelect

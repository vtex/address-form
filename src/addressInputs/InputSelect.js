import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShape from '../propTypes/AddressShape'
import map from 'lodash/map'
import { getListOfOptions } from '../selectors/fields'

class InputSelect extends Component {
  handleChange = e => {
    const value = e.target.value

    this.props.onChange({
      ...this.props.address,
      [this.props.field.name]: value,
    })
  };

  render() {
    const { address, rules, field } = this.props

    return (
      <select
        name={field.name}
        value={address[field.name] || ''}
        onChange={this.handleChange}
      >
        <option value="">{field.optionsCaption || ''}</option>
        {map(getListOfOptions(field, address, rules), ({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
    )
  }
}

InputSelect.propTypes = {
  field: PropTypes.object.isRequired,
  rules: PropTypes.object.isRequired,
  address: PropTypes.shape(AddressShape),
  onChange: PropTypes.func.isRequired,
}

export default InputSelect

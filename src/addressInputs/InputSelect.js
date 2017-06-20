import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation
  from '../propTypes/AddressShapeWithValidation'
import map from 'lodash/map'
import { getListOfOptions } from '../selectors/fields'

class InputSelect extends Component {
  handleChange = e => {
    const { address, field, onChange } = this.props
    const value = e.target.value

    onChange({
      [field.name]: {
        ...address[field.name],
        value,
      },
    })
  };

  onBlur = e => {
    const { address, field, onChange } = this.props

    onChange({
      [field.name]: {
        ...address[field.name],
        visited: true,
      },
    })
  };

  render() {
    const { address, rules, field } = this.props

    return (
      <select
        name={field.name}
        value={address[field.name].value || ''}
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
  address: PropTypes.shape(AddressShapeWithValidation),
  onChange: PropTypes.func.isRequired,
}

export default InputSelect

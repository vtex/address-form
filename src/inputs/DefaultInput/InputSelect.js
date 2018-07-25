import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation from '../../propTypes/AddressShapeWithValidation'
import map from 'lodash/map'
import cx from 'classnames'

class InputSelect extends Component {
  handleChange = e => {
    this.props.onChange(e.target.value)
  }

  render() {
    const { address, options, field, disabled } = this.props
    const fieldValue = address[field.name]

    const className = cx({
      [`input-${field.size}`]: field.size,
      success: fieldValue.valid === true,
      error: fieldValue.valid === false,
    })

    return (
      <select
        name={field.name}
        id={`ship-${field.name}`}
        value={address[field.name].value || ''}
        onChange={this.handleChange}
        onBlur={this.props.onBlur}
        disabled={disabled}
        className={className}
        ref={this.props.inputRef}
      >
        {field.optionsCaption !== null &&
        field.optionsCaption !== undefined &&
        field.optionsCaption === false ? null : (
          <option
            value=""
            disabled={address[field.name].value ? true : undefined}
          >
            {field.optionsCaption}
          </option>
        )}
        {map(options, ({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    )
  }
}

InputSelect.propTypes = {
  field: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  address: AddressShapeWithValidation,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  inputRef: PropTypes.func,
}

export default InputSelect

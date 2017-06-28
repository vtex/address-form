import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation
  from '../propTypes/AddressShapeWithValidation'
import cx from 'classnames'

class InputText extends Component {
  handleChange = e => {
    this.props.onChange(e.target.value)
  };

  render() {
    const { address, field, disabled, inputRef } = this.props
    const fieldValue = address[field.name]

    const className = cx(this.props.className, {
      [`input-${field.size}`]: field.size,
      success: fieldValue.valid === true,
      error: fieldValue.valid === false,
    })

    return (
      <input
        type="text"
        name={field.name}
        value={fieldValue.value || ''}
        onBlur={this.props.onBlur}
        onChange={this.handleChange}
        className={className}
        disabled={disabled}
        ref={inputRef}
      />
    )
  }
}

InputText.defaultProps = {
  className: '',
  disabled: false,
}

InputText.propTypes = {
  field: PropTypes.object.isRequired,
  className: PropTypes.string,
  address: PropTypes.shape(AddressShapeWithValidation),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  inputRef: PropTypes.func,
}

export default InputText

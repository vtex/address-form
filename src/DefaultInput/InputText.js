import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation from '../propTypes/AddressShapeWithValidation'
import cx from 'classnames'

class InputText extends Component {
  handleChange = e => {
    this.props.onChange(e.target.value)
  }

  render() {
    const { address, field, disabled, inputRef, placeholder } = this.props
    const fieldValue = address[field.name]
    const loading = !!address[field.name].loading

    const className = cx(this.props.className, {
      [`input-${field.size}`]: field.size,
      success: !loading && fieldValue.valid === true,
      error: fieldValue.valid === false,
    })

    return (
      <input
        type="text"
        id={`ship-${field.name}`}
        name={field.name}
        value={fieldValue.value || ''}
        placeholder={placeholder}
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
  placeholder: PropTypes.string,
  address: AddressShapeWithValidation,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  inputRef: PropTypes.func,
}

export default InputText

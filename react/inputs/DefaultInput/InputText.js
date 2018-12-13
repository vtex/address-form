import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation from '../../propTypes/AddressShapeWithValidation'
import cx from 'classnames'

class InputText extends Component {
  handleChange = e => {
    this.props.onChange(e.target.value)
  }

  render() {
    const {
      address,
      field,
      disabled,
      inputRef,
      placeholder,
      type,
      autoFocus,
      value,
      onFocus,
    } = this.props
    
    const id = this.props.id.replace('{{fieldName}}', field.name)
    const fieldValue = address[field.name]
    const fieldDisabled = address[field.name].disabled
    const loading = !!address[field.name].loading

    const className = cx(this.props.className, {
      [`input-${field.size}`]: field.size,
      success: !loading && fieldValue.valid === true,
      error: fieldValue.valid === false,
    })
    console.log('fieldDisabled || disabled', fieldDisabled, disabled)
    return (
      <input
        autoFocus={autoFocus}
        autoComplete={field.autoComplete || 'on'}
        id={id}
        type={type}
        name={field.elementName || field.name}
        maxLength={field.maxLength}
        value={fieldValue.value || value || ''}
        placeholder={placeholder}
        onBlur={this.props.onBlur}
        onFocus={onFocus}
        onChange={this.handleChange}
        className={className}
        disabled={fieldDisabled || disabled}
        ref={inputRef}
        data-hj-whitelist
      />
    )
  }
}

InputText.defaultProps = {
  id: 'ship-{{fieldName}}',
  type: 'text',
  className: '',
  disabled: false,
  autoFocus: false,
}

InputText.propTypes = {
  autoFocus: PropTypes.bool.isRequired,
  field: PropTypes.object.isRequired,
  address: AddressShapeWithValidation,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  id: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  inputRef: PropTypes.func,
  value: PropTypes.string,
  onFocus: PropTypes.func,
}

export default InputText

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation from '../../propTypes/AddressShapeWithValidation'
import cx from 'classnames'

class InputCheckbox extends Component {
  handleChange = e => {
    this.props.onChange(e.target.value)
  }

  render() {
    const {
      address,
      field,
      placeholder,
      onFocus,
      onBlur,
      onChange,
    } = this.props

    const id = this.props.id.replace('{{fieldName}}', field.name)
    const fieldValue = address[field.name]
    const checked = address[field.name].disabled
    const loading = !!address[field.name].loading

    const className = cx('input', 'ship-checkboxNumberLabel2', {
        required: field.required,
        hide: field.hidden,
        text: false,
        type: 'checkbox' // That's a bug in the Checkout's CSS
      })
    return (
      <input
        id={'ship-checkboxNumberLabel2'}
        type="checkbox"
        name={field.elementName || field.name}
        checked={checked}
        placeholder={placeholder}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={onChange}
        className={className}
      />
    )
  }
}

InputCheckbox.defaultProps = {
  id: 'ship-{{fieldName}}',
  type: 'text',
  className: '',
  disabled: false,
  autoFocus: false,
}

InputCheckbox.propTypes = {
  field: PropTypes.object.isRequired,
  address: AddressShapeWithValidation,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  id: PropTypes.string,
  className: PropTypes.string,
  onFocus: PropTypes.func,
}

export default InputCheckbox

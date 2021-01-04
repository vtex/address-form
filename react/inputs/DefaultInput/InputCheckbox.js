import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import AddressShapeWithValidation from '../../propTypes/AddressShapeWithValidation'

class InputCheckbox extends Component {
  handleChange = (e) => {
    this.props.onChange(e.target.value)
  }

  render() {
    const { address, field, placeholder, onFocus, onBlur } = this.props

    const checked =
      address[field.name].disabled &&
      !!address[field.name].value &&
      address[field.name].valid

    const id = this.props.id.replace('{{fieldName}}', field.name)
    const className = cx('input', 'ship-checkboxNumberLabel', {
      required: field.required,
      hide: field.hidden,
      text: false,
      type: 'checkbox',
    })

    return (
      <input
        id={id}
        type="checkbox"
        name={field.elementName || field.name}
        defaultChecked={checked}
        checked={checked}
        placeholder={placeholder}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={this.handleChange}
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
  onChange: PropTypes.func,
  onBlur: PropTypes.func.isRequired,
  id: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  onFocus: PropTypes.func,
}

export default InputCheckbox

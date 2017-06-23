import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation
  from '../propTypes/AddressShapeWithValidation'
import cx from 'classnames'

class InputText extends Component {
  handleChange = e => {
    this.props.onChange(e.target.value)
  };

  handleBlur = () => {
    this.props.onBlur()
  };

  render() {
    const { address, field } = this.props
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
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        className={className}
      />
    )
  }
}

InputText.defaultProps = {
  className: '',
}

InputText.propTypes = {
  field: PropTypes.object.isRequired,
  className: PropTypes.string,
  address: PropTypes.shape(AddressShapeWithValidation),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
}

export default InputText

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation
  from '../propTypes/AddressShapeWithValidation'
import InputSelect from './InputSelect'
import InputText from './InputText'
import InputLabel from './InputLabel'
import PostalCodeLoader from '../postalCodeFrom/PostalCodeLoader'

class Input extends Component {
  render() {
    const { field, options, address, inputRef } = this.props
    const loading = !!address[field.name].loading

    if (field.name === 'postalCode') {
      return (
        <InputLabel field={field}>
          <InputText
            field={field}
            className={loading ? 'loading-postal-code' : null}
            address={address}
            onChange={this.props.onChange}
            onBlur={this.props.onBlur}
            inputRef={inputRef}
          />
          {loading && <PostalCodeLoader />}
        </InputLabel>
      )
    }

    return (
      <InputLabel field={field}>
        {options
          ? <InputSelect
            field={field}
            options={options}
            address={address}
            onChange={this.props.onChange}
            onBlur={this.props.onBlur}
            inputRef={inputRef}
            />
          : <InputText
            field={field}
            address={address}
            onChange={this.props.onChange}
            onBlur={this.props.onBlur}
            inputRef={inputRef}
            />}
      </InputLabel>
    )
  }
}

Input.defaultProps = {
  inputRef: () => {},
}

Input.propTypes = {
  field: PropTypes.object.isRequired,
  options: PropTypes.array,
  address: PropTypes.shape(AddressShapeWithValidation),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  inputRef: PropTypes.func,
}

export default Input

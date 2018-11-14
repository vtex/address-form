import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation from '../../propTypes/AddressShapeWithValidation'
import InputSelect from './InputSelect'
import InputText from './InputText'
import InputLabel from './InputLabel'
import InputError from './InputError'
import PostalCodeLoader from '../../postalCodeFrom/PostalCodeLoader'
import { injectIntl, intlShape } from 'react-intl'

class Input extends Component {
  render() {
    const {
      field,
      options,
      address,
      autoFocus,
      inputRef,
      intl,
      shouldShowNumberKeyboard,
    } = this.props
    const loading = !!address[field.name].loading
    const disabled = !!address[field.name].disabled
    const valid = address[field.name].valid

    if (field.name === 'postalCode') {
      return (
        <InputLabel field={field}>
          <InputText
            field={field}
            className={loading ? 'loading-postal-code' : null}
            address={address}
            autoFocus={autoFocus}
            onChange={this.props.onChange}
            onBlur={this.props.onBlur}
            disabled={loading}
            inputRef={inputRef}
            type={shouldShowNumberKeyboard ? 'tel' : 'text'}
          />
          {loading && <PostalCodeLoader />}
          {field.forgottenURL && (
            <small>
              <a href={field.forgottenURL} target="_blank">
                {intl.formatMessage({ id: 'address-form.dontKnowPostalCode' })}
              </a>
            </small>
          )}
          {valid === false ? (
            <InputError reason={address[field.name].reason} />
          ) : null}
        </InputLabel>
      )
    }

    if (field.name === 'addressQuery') {
      return (
        <InputLabel field={field}>
          <InputText
            field={field}
            className={loading ? 'loading-postal-code' : null}
            address={address}
            autoFocus={autoFocus}
            placeholder={intl.formatMessage({
              id: `address-form.geolocation.example.${address.country.value}`,
              defaultMessage: intl.formatMessage({
                id: 'address-form.geolocation.example.UNI',
              }),
            })}
            onChange={this.props.onChange}
            onBlur={this.props.onBlur}
            disabled={loading}
            inputRef={inputRef}
          />
          {loading && <PostalCodeLoader />}
          {valid === false ? (
            <InputError reason={address[field.name].reason} />
          ) : null}
        </InputLabel>
      )
    }

    return (
      <InputLabel field={field}>
        {options ? (
          <InputSelect
            field={field}
            options={options}
            address={address}
            onChange={this.props.onChange}
            onBlur={this.props.onBlur}
            disabled={disabled}
            inputRef={inputRef}
          />
        ) : (
          <InputText
            field={field}
            address={address}
            autoFocus={autoFocus}
            onChange={this.props.onChange}
            placeholder={
              !field.hidden && !field.required
                ? intl.formatMessage({ id: 'address-form.optional' })
                : null
            }
            onBlur={this.props.onBlur}
            disabled={disabled}
            inputRef={inputRef}
          />
        )}
        {valid === false ? (
          <InputError reason={address[field.name].reason} />
        ) : null}
      </InputLabel>
    )
  }
}

Input.defaultProps = {
  inputRef: () => {},
  onBlur: () => {},
  autoFocus: false,
}

Input.propTypes = {
  field: PropTypes.object.isRequired,
  autoFocus: PropTypes.bool,
  options: PropTypes.array,
  address: AddressShapeWithValidation,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  inputRef: PropTypes.func,
  intl: intlShape,
  shouldShowNumberKeyboard: PropTypes.bool,
}

export default injectIntl(Input)

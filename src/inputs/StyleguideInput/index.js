import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Dropdown from '@vtex/styleguide/lib/Dropdown'
import Input from '@vtex/styleguide/lib/Input'
import Button from '@vtex/styleguide/lib/Button'
import Spinner from '@vtex/styleguide/lib/Spinner'
import { injectIntl, intlShape } from 'react-intl'

class StyleguideInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isInputValid: props.address[props.field.name].valid || true,
    }
  }

  handleChange = e => {
    this.props.onChange(e.target.value)
  }

  handleClick = () => {
    this.props.field.forgottenURL &&
      window.open(this.props.field.forgottenURL, '_blank')
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.address[prevProps.field.name] !==
      this.props.address[this.props.field.name]
    ) {
      this.setState({
        isInputValid: this.props.address[this.props.field.name].valid || true,
      })
    }
  }

  render() {
    const { field, options, address, inputRef, intl } = this.props
    const loading = !!address[field.name].loading
    const disabled = !!address[field.name].disabled

    if (field.name === 'postalCode') {
      return (
        <div className="vtex-address-form__postalCode flex flex-row pb7">
          <Input
            label={this.props.intl.formatMessage({
              id: `address-form.field.${field.name}`,
            })}
            value={address[field.name].value || ''}
            disabled={disabled}
            error={!this.state.isInputValid}
            ref={inputRef}
            errorMessage={
              address[field.name].reason &&
              this.props.intl.formatMessage({
                id: `address-form.error.${address[field.name].reason}`,
              })
            }
            onBlur={this.props.onBlur}
            onChange={this.handleChange}
          />
          {loading && (
            <div className="pl1 pt7">
              <Spinner size={15} />
            </div>
          )}
          <div className="pt6 flex-none">
            <Button
              variation="tertiary"
              size="small"
              onClick={this.handleClick}
            >
              {intl.formatMessage({
                id: 'address-form.dontKnowPostalCode',
              })}
            </Button>
          </div>
        </div>
      )
    }

    if (field.name === 'addressQuery') {
      return (
        <div className="vtex-address-form__addressQuery flex flex-row pb7">
          <Input
            label={
              field.fixedLabel ||
              intl.formatMessage({ id: `address-form.field.${field.label}` })
            }
            errorMessage={
              address[field.name].reason &&
              this.props.intl.formatMessage({
                id: `address-form.error.${address[field.name].reason}`,
              })
            }
            placeholder={intl.formatMessage({
              id: `address-form.geolocation.example.${address.country.value}`,
              defaultMessage: intl.formatMessage({
                id: 'address-form.geolocation.example.UNI',
              }),
            })}
            onChange={this.props.onChange}
            onBlur={this.props.onBlur}
            disabled={loading || disabled}
            error={!this.state.isInputValid}
            ref={inputRef}
          />
          {loading && (
            <div className="pl1 pt7">
              <Spinner size={15} />
            </div>
          )}
        </div>
      )
    }

    if (options) {
      return (
        <div className={`vtex-address-form__${field.name} pb7`}>
          <Dropdown
            options={options}
            value={address[field.name].value || ''}
            disabled={disabled}
            ref={inputRef}
            label={intl.formatMessage({
              id: `address-form.field.${field.label}`,
            })}
            onChange={this.handleChange}
            onBlur={this.props.onBlur}
          />
        </div>
      )
    }

    return (
      <div
        className={`vtex-address-form__${field.name} ${
          field.hidden ? 'dn' : ''
        } pb7`}
      >
        <Input
          label={this.props.intl.formatMessage({
            id: `address-form.field.${field.label}`,
          })}
          errorMessage={
            address[field.name].reason &&
            intl.formatMessage({
              id: `address-form.error.${address[field.name].reason}`,
            })
          }
          value={address[field.name].value || ''}
          disabled={disabled}
          error={!this.state.isInputValid}
          maxLength={field.maxLength}
          ref={inputRef}
          placeholder={
            !field.hidden && !field.required
              ? this.props.intl.formatMessage({ id: 'address-form.optional' })
              : null
          }
          onBlur={this.props.onBlur}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

StyleguideInput.defaultProps = {
  onBlur: () => {},
}

StyleguideInput.propTypes = {
  address: PropTypes.object,
  field: PropTypes.object.isRequired,
  options: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  inputRef: PropTypes.func,
  intl: intlShape,
}

export default injectIntl(StyleguideInput)

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Dropdown from '@vtex/styleguide/lib/Dropdown'
import Input from '@vtex/styleguide/lib/Input'
import Link from '@vtex/styleguide/lib/Link'
import InputButton from '@vtex/styleguide/lib/InputButton'
import Checkbox from '@vtex/styleguide/lib/Checkbox'
import { injectIntl, intlShape } from 'react-intl'
import { injectRules } from '../../addressRulesContext'
import { injectAddressContext } from '../../addressContainerContext'
import { compose } from 'recompose'
import SpinnerLoading from '../../Spinner'

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

  handleSubmit = event => {
    event.preventDefault()
    this.props.onSubmit && this.props.onSubmit()
  }

  render() {
    const {
      address,
      autoFocus,
      Button,
      field,
      options,
      onSubmit,
      inputRef,
      intl,
      toggleNotApplicable,
      submitLabel,
    } = this.props
    const loading = !!address[field.name].loading
    const disabled = !!address[field.name].disabled

    const inputCommonProps = {
      label: this.props.intl.formatMessage({
        id: `address-form.field.${field.name}`,
      }),
      autoFocus,
      value: address[field.name].value || '',
      disabled,
      error: !this.state.isInputValid,
      ref: inputRef,
      errorMessage:
        address[field.name].reason &&
        this.props.intl.formatMessage({
          id: `address-form.error.${address[field.name].reason}`,
        }),
      onBlur: this.props.onBlur,
      onChange: this.handleChange,
      isLoading: loading,
    }

    if (field.name === 'postalCode') {
      return (
        <form
          className="vtex-address-form__postalCode"
          onSubmit={this.handleSubmit}
        >
          {Button ? (
            <InputButton
              {...inputCommonProps}
              button={
                submitLabel || intl.formatMessage({ id: 'address-form.search' })
              }
            />
          ) : (
            <Input
              {...inputCommonProps}
              suffix={<SpinnerLoading isLoading={loading} />}
            />
          )}

          {field.forgottenURL && (
            <div className="pt4 flex-none">
              <Link href={field.forgottenURL} target="_blank">
                {intl.formatMessage({
                  id: 'address-form.dontKnowPostalCode',
                })}
              </Link>
            </div>
          )}
        </form>
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
            onChange={this.handleChange}
            onBlur={this.props.onBlur}
            disabled={loading || disabled}
            error={!this.state.isInputValid}
            ref={inputRef}
            suffix={<SpinnerLoading isLoading={loading} />}
          />
        </div>
      )
    }

    if (
      field.name === 'number' &&
      (field.notApplicable || address['addressQuery'].geolocationAutoCompleted)
    ) {
      return (
        <div className="vtex-address-form__number-div flex flex-row pb7">
          <div className="vtex-address-form__number-input flex w-50">
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
              onChange={this.handleChange}
              onBlur={this.props.onBlur}
              disabled={loading || disabled}
              error={!this.state.isInputValid}
              ref={inputRef}
              value={address[field.name].value || ''}
            />
          </div>
          <div className="vtex-address-form__number-checkbox flex flex-row ml7 mt6 w-50">
            <Checkbox
              id="option-0"
              label={this.props.notApplicableLabel || 'N/A'}
              name="default-checkbox-group"
              onChange={toggleNotApplicable}
              value="op"
              checked={!!address[field.name].disabled}
            />
          </div>
        </div>
      )
    }

    if (options) {
      return (
        <div className={`vtex-address-form__${field.name} pb6`}>
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
          maxLength={`${field.maxLength}`}
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
  onSubmit: () => {},
}

StyleguideInput.propTypes = {
  address: PropTypes.object,
  autoFocus: PropTypes.bool,
  Button: PropTypes.func,
  field: PropTypes.object.isRequired,
  inputRef: PropTypes.func,
  intl: intlShape,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  onSubmit: PropTypes.func,
  options: PropTypes.array,
  toggleNotApplicable: PropTypes.func,
  rules: PropTypes.object,
  submitLabel: PropTypes.string,
  notApplicableLabel: PropTypes.string,
}

const enhance = compose(injectAddressContext, injectRules, injectIntl)

export default enhance(StyleguideInput)

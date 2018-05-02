import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Dropdown from '@vtex/styleguide/lib/Dropdown'
import Input from '@vtex/styleguide/lib/Input'
import Button from '@vtex/styleguide/lib/Button'
import Spinner from '@vtex/styleguide/lib/Spinner'
import { injectIntl, intlShape } from 'react-intl'
import 'vtex-tachyons'

class CustomInput extends Component {
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
        isInputValid: this.props.address[this.props.field.name].valid,
      })
    }
  }

  render() {
    const { field, options, address, intl } = this.props
    const loading = !!address[field.name].loading
    const disabled = !!address[field.name].disabled

    if (field.name === 'postalCode') {
      return (
        <div className="vtex-address-form__postalCode flex flex-row pt3 pb2">
          <Input
            label={this.props.intl.formatMessage({
              id: `address-form.field.${field.name}`,
            })}
            value={address[field.name].value}
            disabled={disabled}
            error={!this.state.isInputValid}
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
          <div className="pt6">
            <Button neutral onClick={this.handleClick}>
              {intl.formatMessage({
                id: 'address-form.dontKnowPostalCode',
              })}
            </Button>
          </div>
        </div>
      )
    }

    if (options) {
      return (
        <div className="vtex-address-form__select pt3">
          <Dropdown
            options={options}
            value={address[field.name].value}
            disabled={disabled}
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
      <div className={`vtex-address-form__input ${field.hidden ? 'dn' : ''} pt3`}>
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
          value={address[field.name].value}
          disabled={disabled}
          error={!this.state.isInputValid}
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

CustomInput.defaultProps = {
  onBlur: () => {},
}

CustomInput.propTypes = {
  address: PropTypes.object,
  field: PropTypes.object.isRequired,
  options: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  intl: intlShape,
}

export default injectIntl(CustomInput)

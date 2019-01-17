import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation from '../../propTypes/AddressShapeWithValidation'
import { injectRules } from '../../addressRulesContext'
import { compose } from 'recompose'
import { injectAddressContext } from '../../addressContainerContext'
import { injectIntl, intlShape } from 'react-intl'
import InputText from './InputText'
import InputLabel from './InputLabel'
import InputCheckbox from './InputCheckbox'
import cx from 'classnames'

class GeolocationNumberInput extends Component {
  render() {
    const {
      field,
      address,
      autoFocus,
      inputRef,
      intl,
      disabled,
      onBlur,
      onFocus,
      handleToggle,
      onChangeAddress,
    } = this.props

    const className = cx('input', 'ship-notApplicable', {
      required: field.required,
      hide: field.hidden,
      text: true, // That's a bug in the Checkout's CSS
    })

    const value = address[field.name].value

    return (
      <div className={className} htmlFor={`ship-${field.name}`}>
        <InputLabel field={field}>
          <InputText
            field={field}
            address={address}
            autoFocus={autoFocus}
            onChange={onChangeAddress}
            placeholder={
              !field.hidden && !field.required
                ? intl.formatMessage({ id: 'address-form.optional' })
                : null
            }
            onBlur={onBlur}
            disabled={disabled}
            inputRef={inputRef}
            value={value}
            onFocus={onFocus}
          />
        </InputLabel>
        <InputLabel field={{name: 'checkboxNumberLabel', label: 'noNumber'}}>
          <InputCheckbox
            address={address}
            field={field}
            placeholder={!field.hidden && !field.required
              ? intl.formatMessage({ id: 'address-form.optional' })
              : null}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={handleToggle}
          />
        </InputLabel>
      </div>
    )
  }
}

GeolocationNumberInput.propTypes = {
  address: AddressShapeWithValidation,
  field: PropTypes.object,
  intl: intlShape,
  onChangeAddress: PropTypes.func.isRequired,
  autoFocus: PropTypes.bool,
  options: PropTypes.array,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  inputRef: PropTypes.func,
  shouldShowNumberKeyboard: PropTypes.bool,
  disabled: PropTypes.bool,
  handleToggle: PropTypes.func,
}

const enhance = compose(
  injectAddressContext,
  injectRules,
  injectIntl,
)

export default enhance(GeolocationNumberInput)

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation from './propTypes/AddressShapeWithValidation'
import InputFieldContainer from './InputFieldContainer'
import DefaultInput from './inputs/DefaultInput'
import { injectRules } from './addressRulesContext'
import { compose } from 'recompose'
import { injectAddressContext } from './addressContainerContext'
import { injectIntl, intlShape } from 'react-intl'

class GeolocationNumberForm extends Component {
  render() {
    const {
      onCheckedBox,
      address,
      onChangeAddress,
      rules,
      field,
      onNumberInputFocus,
      Input,
      intl,
    } = this.props

    const checked = !!address['number'].disabled
    return (
      <div className="flex items-center">
        <div className="flex" key={field.name} style={{display: 'flex', alignItems: 'center', alignContent: 'center'}}>
          <InputFieldContainer
            key={field.name}
            Input={Input}
            field={field}
            address={address}
            rules={rules}
            onChangeAddress={onChangeAddress}
            onNumberInputFocus={onNumberInputFocus}
          />
          <div className="flex" style={{display: 'flex', margin: '10px'}}>
            <input
              name="isGoing"
              type="checkbox"
              onChange={onCheckedBox}
              checked={checked}
            />
          </div>
          <div className="flex" style={{display: 'flex', alignItems: 'center', alignContent: 'center', marginTop: '5px'}}>
            {intl.formatMessage({
              id: 'address-form.field.noNumber',
            })}
          </div>
        </div>
      </div>
    )
  }
}

GeolocationNumberForm.defaultProps = {
  omitPostalCodeFields: true,
  omitAutoCompletedFields: true,
  Input: DefaultInput,
  isNumberInputEnabled: false,
}

GeolocationNumberForm.propTypes = {
  onCheckedBox: PropTypes.func,
  Input: PropTypes.func,
  address: AddressShapeWithValidation,
  onNumberInputChange: PropTypes.func,
  omitPostalCodeFields: PropTypes.bool,
  omitAutoCompletedFields: PropTypes.bool,
  rules: PropTypes.object.isRequired,
  field: PropTypes.object,
  onChangeAddress: PropTypes.func.isRequired,
  geolocation: PropTypes.bool,
  googleMaps: PropTypes.object,
  isNumberInputEnabled: PropTypes.bool,
  onNumberInputFocus: PropTypes.func,
  intl: intlShape,
}

const enhance = compose(
  injectAddressContext,
  injectRules,
  injectIntl,
)

export default enhance(GeolocationNumberForm)

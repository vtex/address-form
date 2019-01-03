import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation from './propTypes/AddressShapeWithValidation'
import InputFieldContainer from './InputFieldContainer'
import DefaultInput from './inputs/DefaultInput'
import { injectRules } from './addressRulesContext'
import { compose } from 'recompose'
import { injectAddressContext } from './addressContainerContext'

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
    } = this.props

    const checked = !!address['number'].disabled
    return (
      <div className="flex items-center">
        { !address['number'].disabled ? (
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
                  Sem número
            </div>
          </div>

        ) : (
          <div className="flex" key={field.name} style={{display: 'flex', alignItems: 'center', alignContent: 'center'}}>
            <InputFieldContainer
              disabled
              key={field.name}
              Input={Input}
              field={field}
              address={address}
              rules={rules}
              onChangeAddress={onChangeAddress}
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
                  Sem número
            </div>
          </div>

        )}
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
}

const enhance = compose(
  injectAddressContext,
  injectRules,
)
export default enhance(GeolocationNumberForm)

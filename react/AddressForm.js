import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation from './propTypes/AddressShapeWithValidation'
import InputFieldContainer from './InputFieldContainer'
import DefaultInput from './inputs/DefaultInput'
import {
  filterPostalCodeFields,
  filterAutoCompletedFields,
  isDefiningPostalCodeField,
} from './selectors/fields'
import SelectPostalCode from './postalCodeFrom/SelectPostalCode'
import { injectRules } from './addressRulesContext'
import { compose } from 'recompose'
import { injectAddressContext } from './addressContainerContext'
import GeolocationNumberForm from './GeolocationNumberForm'
import GoogleMapsContainer from './geolocation/GoogleMapsContainer'

class AddressForm extends Component {
  bindOnChange = () => {
    const { address, onChangeAddress } = this.props
    return () => {
      onChangeAddress({
        'number': {
          ...address['number'],
          value: !address['number'].disabled ? 'N/A' : '',
          disabled: !address['number'].disabled,
        },
      })
    }
  }

  render() {
    const {
      address,
      disableNumberInput,
      rules,
      onChangeAddress,
      Input,
      omitPostalCodeFields,
      omitAutoCompletedFields,
      geolocation,
      googleMapsKey,
      isNumberInputEnabled,
      onNumberInputFocus,
    } = this.props

    let fields = omitPostalCodeFields
      ? filterPostalCodeFields(rules)
      : rules.fields

    fields = omitAutoCompletedFields
      ? filterAutoCompletedFields({ fields }, address)
      : fields

    if (fields.length <= 3) {
      disableNumberInput()
    }

    return (
      <div className="flex items-center">
        {fields.map(
          (field, index) =>
            isDefiningPostalCodeField(field.name, rules) ? (
              <SelectPostalCode
                Input={Input}
                rules={rules}
                address={address}
                onChangeAddress={onChangeAddress}
              />
            ) : index === 0 && geolocation && fields.length > 3 ? (
              <GoogleMapsContainer apiKey={googleMapsKey}>
                {({ googleMaps }) => {
                  return (<GeolocationNumberForm
                    key={index}
                    testeIndex={this.bindOnChange()}
                    address={address}
                    rules={rules}
                    field={field}
                    onChangeAddress={onChangeAddress}
                    Input={Input}
                    omitPostalCodeFields={omitPostalCodeFields}
                    omitAutoCompletedFields={omitAutoCompletedFields}
                    geolocation={geolocation}
                    googleMaps={googleMaps}
                    isNumberInputEnabled={isNumberInputEnabled}
                    onNumberInputFocus={onNumberInputFocus}
                    disableNumberInput={disableNumberInput}

                  />)
                }}
              </GoogleMapsContainer>
            ) : (
              <div key={index}>
                <InputFieldContainer
                  key={field.name}
                  Input={Input}
                  field={field}
                  address={address}
                  rules={rules}
                  onChangeAddress={onChangeAddress}
                />
              </div>
            ),
        )}
      </div>
    )
  }
}

AddressForm.defaultProps = {
  omitPostalCodeFields: true,
  omitAutoCompletedFields: true,
  Input: DefaultInput,
  isNumberInputEnabled: false,
}

AddressForm.propTypes = {
  Input: PropTypes.func,
  address: AddressShapeWithValidation,
  disableNumberInput: PropTypes.func,
  omitPostalCodeFields: PropTypes.bool,
  omitAutoCompletedFields: PropTypes.bool,
  rules: PropTypes.object.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
  geolocation: PropTypes.bool,
  googleMapsKey: PropTypes.string,
  isNumberInputEnabled: PropTypes.bool,
  onNumberInputFocus: PropTypes.func,
}

const enhance = compose(
  injectAddressContext,
  injectRules,
)
export default enhance(AddressForm)

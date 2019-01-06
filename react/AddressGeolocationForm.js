import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation from './propTypes/AddressShapeWithValidation'
import InputFieldContainer from './InputFieldContainer'
import DefaultInput from './inputs/DefaultInput'
import {
  filterPostalCodeFields,
  filterAutoCompletedFields,
} from './selectors/fields'
import { injectRules } from './addressRulesContext'
import { compose } from 'recompose'
import { injectAddressContext } from './addressContainerContext'
import GeolocationNumberForm from './GeolocationNumberForm'
import GoogleMapsContainer from './geolocation/GoogleMapsContainer'
import { injectIntl, intlShape } from 'react-intl'

class AddressGeolocationForm extends Component {
  bindOnChange = () => {
    const { address, onChangeAddress, intl } = this.props
    return () => {
      onChangeAddress({
        'number': {
          ...address['number'],
          value: !address['number'].disabled
            ? intl.formatMessage({
              id: 'address-form.field.notApplicable',
            }) : '',
          disabled: !address['number'].disabled,
        },
      })
    }
  }

  handleCompletedNumberAddress = () => {
    const { disableNumberInput } = this.props
    disableNumberInput()
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

    const fieldCondition = fields.length > 3
    const geolocationCondition = geolocation && fieldCondition

    if (!fieldCondition) {
      this.handleCompletedNumberAddress()
    }

    return (
      <div className="flex items-center">
        {fields.map(
          (field, index) =>
            index === 0 && geolocationCondition ? (
              <GoogleMapsContainer apiKey={googleMapsKey}>
                {({ googleMaps }) => {
                  return (<GeolocationNumberForm
                    key={index}
                    onCheckedBox={this.bindOnChange()}
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

AddressGeolocationForm.defaultProps = {
  omitPostalCodeFields: true,
  omitAutoCompletedFields: true,
  Input: DefaultInput,
  isNumberInputEnabled: false,
}

AddressGeolocationForm.propTypes = {
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
  intl: intlShape,
  onNumberInputFocus: PropTypes.func,
}

const enhance = compose(
  injectAddressContext,
  injectRules,
  injectIntl,
)

export default enhance(AddressGeolocationForm)

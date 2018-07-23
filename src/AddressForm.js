import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation from './propTypes/AddressShapeWithValidation'
import InputFieldContainer from './InputFieldContainer'
import DefaultInput from './DefaultInput'
import {
  filterPostalCodeFields,
  filterAutoCompletedFields,
  isDefiningPostalCodeField,
} from './selectors/fields'
import SelectPostalCode from './postalCodeFrom/SelectPostalCode'
import { injectRules } from './addressRulesContext'

class AddressForm extends Component {
  render() {
    const {
      address,
      rules,
      onChangeAddress,
      Input,
      omitPostalCodeFields,
      omitAutoCompletedFields,
    } = this.props

    let fields = omitPostalCodeFields
      ? filterPostalCodeFields(rules)
      : rules.fields

    fields = omitAutoCompletedFields
      ? filterAutoCompletedFields({ fields }, address)
      : fields

    return (
      <div>
        {fields.map(
          field =>
            isDefiningPostalCodeField(field.name, rules) ? (
              <SelectPostalCode
                Input={Input}
                rules={rules}
                address={address}
                onChangeAddress={onChangeAddress}
              />
            ) : (
              <InputFieldContainer
                key={field.name}
                Input={Input}
                field={field}
                address={address}
                rules={rules}
                onChangeAddress={onChangeAddress}
              />
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
}

AddressForm.propTypes = {
  Input: PropTypes.func,
  address: AddressShapeWithValidation,
  omitPostalCodeFields: PropTypes.bool,
  omitAutoCompletedFields: PropTypes.bool,
  rules: PropTypes.object.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
}

export default injectRules(AddressForm)

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation from './propTypes/AddressShapeWithValidation'
import InputFieldContainer from './InputFieldContainer'
import Input from './addressInputs/Input'
import { filterFields, isDefiningPostalCodeField } from './selectors/fields'
import SelectPostalCode from './postalCodeFrom/SelectPostalCode'

class AddressForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fields: props.omitPostalCodeFields
        ? filterFields(props.rules)
        : props.rules.fields,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.rules.postalCodeFrom !== this.props.rules.postalCodeFrom ||
      nextProps.omitPostalCodeFields !== this.props.omitPostalCodeFields
    ) {
      this.setState({
        fields: nextProps.omitPostalCodeFields
          ? filterFields(nextProps.rules)
          : nextProps.rules.fields,
      })
    }
  }

  render() {
    const { address, rules, onChangeAddress } = this.props
    const { fields } = this.state

    return (
      <div>
        {fields.map(
          field =>
            (isDefiningPostalCodeField(field.name, rules)
              ? <SelectPostalCode
                Input={Input}
                rules={rules}
                address={address}
                onChangeAddress={onChangeAddress}
                />
              : <InputFieldContainer
                key={field.name}
                Input={Input}
                field={field}
                address={address}
                rules={rules}
                onChangeAddress={onChangeAddress}
                />)
        )}
      </div>
    )
  }
}

AddressForm.defaultProps = {
  omitPostalCodeFields: true,
}

AddressForm.propTypes = {
  address: PropTypes.shape(AddressShapeWithValidation),
  omitPostalCodeFields: PropTypes.bool,
  rules: PropTypes.object.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
}

export default AddressForm

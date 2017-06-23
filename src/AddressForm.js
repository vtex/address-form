import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation from './propTypes/AddressShapeWithValidation'
import Input from './addressInputs/Input'
import {
  filterFields,
  getListOfOptions,
  hasOptions,
  isDefiningPostalCodeField,
} from './selectors/fields'
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
                rules={rules}
                address={address}
                onChangeAddress={onChangeAddress}
                >
                {({ field, address, onChangeAddress, options }) => (
                  <Input
                    key={field.name}
                    field={field}
                    options={options}
                    address={address}
                    onChangeAddress={onChangeAddress}
                    />
                  )}
              </SelectPostalCode>
              : <Input
                key={field.name}
                field={field}
                options={
                    hasOptions(field)
                      ? getListOfOptions(field, address, rules)
                      : undefined
                  }
                address={address}
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

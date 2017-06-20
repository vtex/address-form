import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation from './propTypes/AddressShapeWithValidation'
import InputSelect from './addressInputs/InputSelect'
import InputText from './addressInputs/InputText'
import InputLabel from './addressInputs/InputLabel'
import SelectPostalCode from './postalCodeFrom/SelectPostalCode'
import {
  hasOptions,
  filterFields,
  isDefiningPostalCodeField,
} from './selectors/fields'

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
        {fields.map(field => (
          <div key={field.name}>
            {hasOptions(field)
              ? isDefiningPostalCodeField(field.name, rules)
                  ? <SelectPostalCode
                    rules={rules}
                    address={address}
                    onChangeAddress={onChangeAddress}
                    />
                  : <InputLabel field={field}>
                    <InputSelect
                      field={field}
                      rules={rules}
                      address={address}
                      onChange={onChangeAddress}
                      />
                  </InputLabel>
              : <InputLabel field={field}>
                <InputText
                  field={field}
                  address={address}
                  onChange={onChangeAddress}
                  />
              </InputLabel>}
          </div>
        ))}
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

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShape from './propTypes/AddressShape'
import InputSelect from './addressInputs/InputSelect'
import InputText from './addressInputs/InputText'
import InputLabel from './addressInputs/InputLabel'
import { hasOptions, filterFields } from './selectors/fields'

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
            <InputLabel field={field}>
              {hasOptions(field)
                ? <InputSelect
                  field={field}
                  rules={rules}
                  address={address}
                  onChange={onChangeAddress}
                  />
                : <InputText
                  field={field}
                  address={address}
                  onChange={onChangeAddress}
                  />}
            </InputLabel>
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
  address: PropTypes.shape(AddressShape),
  omitPostalCodeFields: PropTypes.bool,
  rules: PropTypes.object.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
}

export default AddressForm

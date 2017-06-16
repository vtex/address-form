import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShape from './propTypes/AddressShape'
import { POSTAL_CODE, ONE_LEVEL, TWO_LEVELS, THREE_LEVELS } from './constants'
import filter from 'lodash/filter'
import InputSelect from './addressInputs/InputSelect'
import InputText from './addressInputs/InputText'
import { hasOptions } from './rulesLens/fields'

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
            <label>
              {field.label}
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
            </label>
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

/**
 * Remove fields already filled in PostalCodeGetter
 * @param {Object} rules
 */
export function filterFields(rules) {
  switch (rules.postalCodeFrom) {
    case THREE_LEVELS:
      return filter(
        rules.fields,
        ({ name }) => rules.postalCodeLevels.indexOf(name) === -1
      )
    case TWO_LEVELS:
      return filter(
        rules.fields,
        ({ name }) => rules.postalCodeLevels.indexOf(name) === -1
      )
    case ONE_LEVEL:
      return filter(rules.fields, ({ name }) => rules.postalCodeLevel !== name)
    default:
    case POSTAL_CODE:
      return filter(rules.fields, ({ name }) => name !== 'postalCode')
  }
}

export default AddressForm

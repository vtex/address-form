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
import { injectIntl, intlShape } from 'react-intl'

class AddressForm extends Component {
  render() {
    const {
      address,
      rules,
      onChangeAddress,
      Input,
      intl,
      notApplicableLabel,
      omitPostalCodeFields,
      omitAutoCompletedFields,
      omitContainerElement,
    } = this.props

    let fields = omitPostalCodeFields
      ? filterPostalCodeFields(rules)
      : rules.fields

    fields = omitAutoCompletedFields
      ? filterAutoCompletedFields({ fields }, address)
      : fields

    const content = fields.map((field) =>
      isDefiningPostalCodeField(field.name, rules) ? (
        <SelectPostalCode
          key={field.name}
          Input={Input}
          rules={rules}
          address={address}
          onChangeAddress={onChangeAddress}
        />
      ) : (
        <InputFieldContainer
          intl={intl}
          key={field.name}
          Input={Input}
          field={field}
          address={address}
          rules={rules}
          onChangeAddress={onChangeAddress}
          notApplicableLabel={notApplicableLabel}
        />
      ),
    )
    return omitContainerElement ? (
      content
    ) : (
      <div className="vtex-address-form__container">{content}</div>
    )
  }
}

AddressForm.defaultProps = {
  omitPostalCodeFields: true,
  omitAutoCompletedFields: true,
  omitContainerElement: false,
  Input: DefaultInput,
}

AddressForm.propTypes = {
  Input: PropTypes.func,
  intl: intlShape,
  address: AddressShapeWithValidation,
  omitPostalCodeFields: PropTypes.bool,
  omitAutoCompletedFields: PropTypes.bool,
  rules: PropTypes.object.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
  notApplicableLabel: PropTypes.string,
}

const enhance = compose(injectAddressContext, injectRules, injectIntl)
export default enhance(AddressForm)

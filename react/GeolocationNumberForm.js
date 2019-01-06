import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation from './propTypes/AddressShapeWithValidation'
import InputFieldContainer from './InputFieldContainer'
import DefaultInput from './inputs/DefaultInput'
import { injectRules } from './addressRulesContext'
import { compose } from 'recompose'
import { injectAddressContext } from './addressContainerContext'
import { injectIntl, intlShape } from 'react-intl'

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
      intl,
    } = this.props

    const noNumberChecked = !!address['number'].disabled
    return (
      <div className="flex items-center">
        <div className="flex" style={{display: 'flex', alignItems: 'center', alignContent: 'center'}}>
          <InputFieldContainer
            disabled={noNumberChecked}
            Input={Input}
            field={field}
            address={address}
            rules={rules}
            onChangeAddress={onChangeAddress}
            onNumberInputFocus={onNumberInputFocus}
          />
          <div className="flex" style={{display: 'flex', margin: '10px'}}>
            <input
              name="noNumberCheckbox"
              type="checkbox"
              onChange={onCheckedBox}
              checked={noNumberChecked}
            />
          </div>
          <div className="flex" style={{display: 'flex', alignItems: 'center', alignContent: 'center', marginTop: '5px'}}>
            {intl.formatMessage({
              id: 'address-form.field.noNumber',
            })}
          </div>
        </div>
      </div>
    )
  }
}

GeolocationNumberForm.defaultProps = {
  Input: DefaultInput,
}

GeolocationNumberForm.propTypes = {
  address: AddressShapeWithValidation,
  field: PropTypes.object,
  Input: PropTypes.func,
  intl: intlShape,
  onChangeAddress: PropTypes.func.isRequired,
  onCheckedBox: PropTypes.func,
  onNumberInputFocus: PropTypes.func,
  rules: PropTypes.object.isRequired,
}

const enhance = compose(
  injectAddressContext,
  injectRules,
  injectIntl,
)

export default enhance(GeolocationNumberForm)

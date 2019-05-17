import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation from '../propTypes/AddressShapeWithValidation'
import { getLevelField } from '../selectors/postalCode'
import InputFieldContainer from '../InputFieldContainer'
import { injectIntl, intlShape } from 'react-intl'

class SelectLevel extends Component {
  render() {
    const { level, rules, address, Input, intl, onChangeAddress } = this.props
    const field = getLevelField(level, rules)

    return (
      <InputFieldContainer
        intl={intl}
        Input={Input}
        field={field}
        address={address}
        rules={rules}
        onChangeAddress={onChangeAddress}
      />
    )
  }
}

SelectLevel.propTypes = {
  Input: PropTypes.func.isRequired,
  intl: intlShape,
  level: PropTypes.oneOf([0, 1]),
  address: AddressShapeWithValidation,
  rules: PropTypes.object.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
}

export default injectIntl(SelectLevel)

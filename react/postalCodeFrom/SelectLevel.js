import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

import { getLevelField } from '../selectors/postalCode'
import InputFieldContainer from '../InputFieldContainer'
import { addressContextPropTypes } from '../addressContainerContext'

class SelectLevel extends Component {
  render() {
    const {
      level,
      rules,
      fieldsStyleRules,
      address,
      Input,
      intl,
      onChangeAddress,
    } = this.props

    const field = getLevelField(level, rules)

    return (
      <InputFieldContainer
        intl={intl}
        Input={Input}
        field={field}
        address={address}
        rules={rules}
        fieldsStyleRules={fieldsStyleRules}
        onChangeAddress={onChangeAddress}
      />
    )
  }
}

SelectLevel.propTypes = {
  ...addressContextPropTypes,
  Input: PropTypes.func.isRequired,
  intl: intlShape,
  level: PropTypes.oneOf([0, 1]),
  rules: PropTypes.object.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
}

export default injectIntl(SelectLevel)

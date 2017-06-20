import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation
  from '../propTypes/AddressShapeWithValidation'
import { getField } from '../selectors/fields'
import InputLabel from '../addressInputs/InputLabel'
import InputText from '../addressInputs/InputText'

class PostalCode extends Component {
  render() {
    const { address, rules, onChangeAddress } = this.props
    const field = getField('postalCode', rules)

    return (
      <InputLabel field={field}>
        <InputText field={field} address={address} onChange={onChangeAddress} />
      </InputLabel>
    )
  }
}

PostalCode.propTypes = {
  address: PropTypes.shape(AddressShapeWithValidation).isRequired,
  rules: PropTypes.object.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
}

export default PostalCode

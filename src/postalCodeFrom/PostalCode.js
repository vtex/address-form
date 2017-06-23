import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation
  from '../propTypes/AddressShapeWithValidation'
import { getField } from '../selectors/fields'
import InputLabel from '../addressInputs/InputLabel'
import InputText from '../addressInputs/InputText'
import PostalCodeLoader from './PostalCodeLoader'

class PostalCode extends Component {
  handleChange = value => {
    const { address, onChangeAddress } = this.props

    onChangeAddress({
      postalCode: {
        ...address.postalCode,
        autoCompleted: undefined,
        value,
      },
    })
  };

  handleBlur = () => {
    const { address, onChangeAddress } = this.props

    onChangeAddress({
      postalCode: {
        ...address.postalCode,
        visited: true,
      },
    })
  };

  render() {
    const { address, rules } = this.props
    const field = getField('postalCode', rules)

    const loading = !!address.postalCode.loading

    return (
      <InputLabel field={field}>
        <InputText
          className={loading ? 'loading-postal-code' : null}
          field={field}
          address={address}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
        {loading && <PostalCodeLoader />}
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

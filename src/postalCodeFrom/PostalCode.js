import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation
  from '../propTypes/AddressShapeWithValidation'
import { getField } from '../selectors/fields'

class PostalCode extends Component {
  handleChange = e => {
    const postalCode = e.target.value
    this.props.onChangeAddress({
      ...this.props.address,
      postalCode: { value: postalCode },
    })
  };

  render() {
    const { address: { postalCode: { value } }, rules } = this.props
    const field = getField('postalCode', rules)

    return (
      <div className="postal-code">
        <label>
          {field.fixedLabel || field.label}
          <input type="text" value={value || ''} onChange={this.handleChange} />
        </label>
      </div>
    )
  }
}

PostalCode.propTypes = {
  address: PropTypes.shape(AddressShapeWithValidation).isRequired,
  rules: PropTypes.object.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
}

export default PostalCode

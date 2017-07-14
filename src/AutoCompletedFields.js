import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation from './propTypes/AddressShapeWithValidation'
import AddressSummary from './AddressSummary'
import { removeValidation, removeField } from './transforms/address'
import pickBy from 'lodash/pickBy'
import find from 'lodash/find'
import flow from 'lodash/flow'

const removeAutoCompletedFields = flow([
  address => removeField(address, 'postalCodeAutoCompleted'),
  address => removeField(address, 'geolocationAutoCompleted'),
])

class AutoCompletedFields extends Component {
  handleClickChange = e => {
    e.preventDefault()
    const { address, onChangeAddress } = this.props

    onChangeAddress(removeAutoCompletedFields(address))
  }

  hasAutoCompletedField(address) {
    return find(
      address,
      field => field.postalCodeAutoCompleted || field.geolocationAutoCompleted
    )
  }

  render() {
    const { address, rules } = this.props

    if (this.hasAutoCompletedField(address) === undefined) {
      return null
    }

    const filteredAddress = pickBy(
      address,
      field => field.postalCodeAutoCompleted || field.geolocationAutoCompleted
    )

    return (
      <div>
        <AddressSummary
          canEditData
          address={{
            ...removeValidation(filteredAddress),
            addressId: '',
            addressType: 'residential',
            postalCode: '',
            country: '',
          }}
          rules={rules}
        >
          <span> - </span>
          <a
            className="link-edit"
            onClick={this.handleClickChange}
            id="force-shipping-fields"
          >
            Edit
          </a>
        </AddressSummary>
      </div>
    )
  }
}

AutoCompletedFields.propTypes = {
  address: AddressShapeWithValidation,
  rules: PropTypes.object.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
}

export default AutoCompletedFields

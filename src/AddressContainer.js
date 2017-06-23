import { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation from './propTypes/AddressShapeWithValidation'
import { validateChangedFields } from './validateAddress'
import { POSTAL_CODE } from './constants'
import autoCompleteAddress from './addressAutoComplete'

class AddressContainer extends Component {
  handleAddressChange = changedAddressFields => {
    const { rules, address, accountName, onChangeAddress } = this.props

    const countryChanged =
      changedAddressFields.country &&
      changedAddressFields.country.value &&
      changedAddressFields.country.value !== address.country.value

    if (countryChanged) {
      return onChangeAddress({
        ...address,
        ...changedAddressFields,
      })
    }

    const addressValidated = validateChangedFields(
      changedAddressFields,
      address,
      rules
    )

    if (changedAddressFields.postalCode) {
      const postalCodeIsNowValid =
        address.postalCode.valid !== true &&
        addressValidated.postalCode.valid === true

      if (rules.postalCodeFrom === POSTAL_CODE && postalCodeIsNowValid) {
        return onChangeAddress(
          autoCompleteAddress(
            addressValidated,
            accountName,
            rules,
            this.handleAddressChange
          )
        )
      }
    }

    onChangeAddress(addressValidated)
  };

  render() {
    return this.props.children(this.handleAddressChange)
  }
}

AddressContainer.propTypes = {
  accountName: PropTypes.string.isRequired,
  address: PropTypes.shape(AddressShapeWithValidation),
  rules: PropTypes.object.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
}

export default AddressContainer

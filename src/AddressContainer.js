import { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation from './propTypes/AddressShapeWithValidation'
import { validateChangedFields } from './validateAddress'
import { POSTAL_CODE } from './constants'
import autoCompleteAddress from './addressAutoComplete'

class AddressContainer extends Component {
  handleAddressChange = changedAddressFields => {
    const { rules, address, accountName, onChangeAddress } = this.props

    const country = changedAddressFields.country &&
      changedAddressFields.country.value
      ? changedAddressFields.country.value
      : address.country.value

    const selectedRule = rules[country]

    const addressValidated = validateChangedFields(
      changedAddressFields,
      address,
      selectedRule
    )

    if (changedAddressFields.postalCode && selectedRule) {
      const postalCodeIsNowValid =
        address.postalCode.valid !== true &&
        addressValidated.postalCode.valid === true

      if (selectedRule.postalCodeFrom === POSTAL_CODE && postalCodeIsNowValid) {
        return onChangeAddress(
          autoCompleteAddress(
            addressValidated,
            accountName,
            selectedRule,
            this.handleAddressChange
          )
        )
      }
    }

    onChangeAddress(addressValidated)
  };

  render() {
    const { address, rules, children } = this.props

    return children({
      address,
      rules: rules[address.country.value],
      onChangeAddress: this.handleAddressChange,
    })
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

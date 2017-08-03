import { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation from './propTypes/AddressShapeWithValidation'
import { validateChangedFields } from './validateAddress'
import { POSTAL_CODE } from './constants'
import postalCodeAutoCompleteAddress from './postalCodeAutoCompleteAddress'

class AddressContainer extends Component {
  handleAddressChange = changedAddressFields => {
    const {
      rules,
      address,
      accountName,
      onChangeAddress,
      autoCompletePostalCode,
    } = this.props

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

    if (
      autoCompletePostalCode &&
      changedAddressFields.postalCode &&
      !changedAddressFields.postalCode.geolocationAutoCompleted
    ) {
      const postalCodeIsNowValid =
        address.postalCode.valid !== true &&
        addressValidated.postalCode.valid === true

      if (rules.postalCodeFrom === POSTAL_CODE && postalCodeIsNowValid) {
        return onChangeAddress(
          postalCodeAutoCompleteAddress(
            addressValidated,
            accountName,
            rules,
            this.handleAddressChange
          )
        )
      }
    }

    onChangeAddress(addressValidated)
  }

  render() {
    return this.props.children(this.handleAddressChange)
  }
}

AddressContainer.defaultProps = {
  autoCompletePostalCode: true,
}

AddressContainer.propTypes = {
  accountName: PropTypes.string.isRequired,
  address: AddressShapeWithValidation,
  rules: PropTypes.object.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
  autoCompletePostalCode: PropTypes.bool,
}

export default AddressContainer

import { Component } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import AddressShapeWithValidation from './propTypes/AddressShapeWithValidation'
import { validateChangedFields } from './validateAddress'
import { POSTAL_CODE } from './constants'
import postalCodeAutoCompleteAddress from './postalCodeAutoCompleteAddress'

class AddressContainer extends Component {
  componentDidMount() {
    if (
      this.props &&
      this.props.shouldHandleAddressChangeOnMount &&
      get(this.props, 'address.postalCode.value')
    ) {
      this.handleAddressChange(this.props.address)
    }
  }

  handleAddressChange = changedAddressFields => {
    const {
      cors,
      accountName,
      rules,
      address,
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
      rules,
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
          postalCodeAutoCompleteAddress({
            cors,
            accountName,
            address: addressValidated,
            rules,
            callback: this.handleAddressChange,
          }),
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
  cors: false,
  autoCompletePostalCode: true,
  shouldHandleAddressChangeOnMount: false,
}

AddressContainer.propTypes = {
  cors: PropTypes.bool,
  accountName: PropTypes.string,
  address: AddressShapeWithValidation,
  rules: PropTypes.object.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
  autoCompletePostalCode: PropTypes.bool,
  shouldHandleAddressChangeOnMount: PropTypes.bool,
}

export default AddressContainer

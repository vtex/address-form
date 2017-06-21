import { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation from './propTypes/AddressShapeWithValidation'
import { validateChangedFields } from './validateAddress'

class AddressContainer extends Component {
  handleAddressChange = changedAddressFields => {
    const { rules, address, onChangeAddress } = this.props

    const country = changedAddressFields.country &&
      changedAddressFields.country.value
      ? changedAddressFields.country.value
      : address.country.value

    onChangeAddress(
      validateChangedFields(changedAddressFields, address, rules[country])
    )
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
  address: PropTypes.shape(AddressShapeWithValidation),
  rules: PropTypes.object.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
}

export default AddressContainer

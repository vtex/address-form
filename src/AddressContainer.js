import React, { Component } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import AddressShape from './propTypes/AddressShape'
import { validateChangedFields, isValidAddress } from './validateAddress'
import { POSTAL_CODE } from './constants'
import postalCodeAutoCompleteAddress from './postalCodeAutoCompleteAddress'
import { AddressContext } from './addressContainerContext'
import { injectRules } from './addressRulesContext'
import { addValidation, removeValidation } from './transforms/address'

class AddressContainer extends Component {
  componentDidMount() {
    this.setState({
      address: {
        ...addValidation(this.props.address),
      },
    })

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
      autoCompletePostalCode,
      shouldAddFocusToNextInvalidField,
    } = this.props

    const { address } = this.state

    const countryChanged =
      changedAddressFields.country &&
      changedAddressFields.country.value &&
      changedAddressFields.country.value !== address.country.value

    if (countryChanged) {
      return this.updateAddress({
        ...address,
        ...changedAddressFields,
      })
    }

    const validatedAddress = validateChangedFields(
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
        validatedAddress.postalCode.valid === true

      if (rules.postalCodeFrom === POSTAL_CODE && postalCodeIsNowValid) {
        return this.updateAddress(
          postalCodeAutoCompleteAddress({
            cors,
            accountName,
            address: validatedAddress,
            rules,
            callback: this.handleAddressChange,
            shouldAddFocusToNextInvalidField,
          }),
        )
      }
    }

    this.updateAddress(validatedAddress)
  }

  handleSubmit = e => {
    e.preventDefault()

    const { rules, onSubmit } = this.props
    const { address } = this.state
    const { valid, address: validatedAddress } = isValidAddress(address, rules)
    this.updateAddress(validatedAddress)

    if (onSubmit) {
      onSubmit(valid, removeValidation(validatedAddress))
    }
  }

  updateAddress(newAddress) {
    const { onChangeAddress } = this.props
    this.setState(() => ({
      address: {
        ...newAddress,
      },
    }))

    if (onChangeAddress) {
      onChangeAddress(newAddress)
    }
  }

  render() {
    const { children, Input } = this.props
    const { address } = this.state
    const handleAddressChange = this.handleAddressChange
    const handleSubmit = this.handleSubmit

    return (
      <AddressContext.Provider
        value={{ address, handleAddressChange, handleSubmit, Input }}
      >
        {children}
      </AddressContext.Provider>
    )
  }
}

AddressContainer.defaultProps = {
  cors: false,
  autoCompletePostalCode: true,
  shouldHandleAddressChangeOnMount: false,
  shouldAddFocusToNextInvalidField: true,
}

AddressContainer.propTypes = {
  cors: PropTypes.bool,
  accountName: PropTypes.string,
  address: AddressShape,
  rules: PropTypes.object.isRequired,
  Input: PropTypes.func,
  onChangeAddress: PropTypes.func,
  onSubmit: PropTypes.func,
  children: PropTypes.any.isRequired,
  autoCompletePostalCode: PropTypes.bool,
  shouldHandleAddressChangeOnMount: PropTypes.bool,
  shouldAddFocusToNextInvalidField: PropTypes.bool,
}

export default injectRules(AddressContainer)

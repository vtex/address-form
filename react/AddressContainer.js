import React, { Component } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'

import AddressShapeWithValidation from './propTypes/AddressShapeWithValidation'
import { validateChangedFields } from './validateAddress'
import { POSTAL_CODE } from './constants'
import postalCodeAutoCompleteAddress from './postalCodeAutoCompleteAddress'
import { AddressContext } from './addressContainerContext'
import { injectRules } from './addressRulesContext'

class AddressContainer extends Component {
  componentDidMount() {
    if (
      this.props.shouldHandleAddressChangeOnMount &&
      get(this.props, 'address.postalCode.value')
    ) {
      this.handleAddressChange(this.props.address)
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.shouldHandleAddressChangeOnMount !==
        prevProps.shouldHandleAddressChangeOnMount ||
      get(this.props, 'address.postalCode.value') !==
        get(prevProps, 'address.postalCode.value')
    ) {
      if (this.props.shouldHandleAddressChangeOnMount) {
        this.handleAddressChange(this.props.address)
      }
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
      shouldAddFocusToNextInvalidField,
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
      const postalCodeField =
        rules.fields && rules.fields.find(field => field.name === 'postalCode')
      const diffFromPrev =
        address.postalCode.value !== validatedAddress.postalCode.value
      const isValidPostalCode = validatedAddress.postalCode.valid === true
      const isValidCountryCode = validatedAddress.country.valid === true
      const shouldAutoComplete =
        rules.postalCodeFrom === POSTAL_CODE &&
        diffFromPrev &&
        isValidPostalCode &&
        isValidCountryCode &&
        postalCodeField &&
        postalCodeField.postalCodeAPI

      if (shouldAutoComplete) {
        return onChangeAddress(
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

    onChangeAddress(validatedAddress)
  }

  render() {
    const { children, Input, address } = this.props
    const { handleAddressChange } = this

    return (
      <AddressContext.Provider value={{ address, handleAddressChange, Input }}>
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
  address: AddressShapeWithValidation,
  rules: PropTypes.object.isRequired,
  Input: PropTypes.func,
  onChangeAddress: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
  autoCompletePostalCode: PropTypes.bool,
  shouldHandleAddressChangeOnMount: PropTypes.bool,
  shouldAddFocusToNextInvalidField: PropTypes.bool,
}

export default injectRules(AddressContainer)

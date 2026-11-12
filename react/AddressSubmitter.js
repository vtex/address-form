import { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { injectAddressContext } from './addressContainerContext'
import AddressShapeWithValidation from './propTypes/AddressShapeWithValidation'
import { isValidAddress } from './validateAddress'
import { removeValidation } from './transforms/address'
import { injectRules } from './addressRulesContext'

class AddressSubmitter extends Component {
  handleSubmit = () => {
    const { address, rules, onSubmit, onChangeAddress } = this.props
    const { valid, address: validatedAddress } = isValidAddress(address, rules)

    // invalid fields get showErrorMessage so inputs render the error state
    // (red border + message) after a submit attempt; fields that were flagged
    // invalid before but are valid now are sent back to clear the stale flag
    const changedFields = Object.keys(validatedAddress)
      .filter(
        key =>
          validatedAddress[key].valid === false ||
          (address[key] && address[key].valid === false)
      )
      .reduce((filteredAddress, key) => {
        filteredAddress[key] =
          validatedAddress[key].valid === false
            ? { ...validatedAddress[key], showErrorMessage: true }
            : validatedAddress[key]
        return filteredAddress
      }, {})

    onChangeAddress(changedFields)
    onSubmit(valid, removeValidation(validatedAddress))
  }

  render() {
    const { children } = this.props
    return children(this.handleSubmit)
  }
}

AddressSubmitter.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  rules: PropTypes.object.isRequired,
  address: AddressShapeWithValidation,
  onChangeAddress: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
}

const enhance = compose(
  injectAddressContext,
  injectRules,
)
export default enhance(AddressSubmitter)

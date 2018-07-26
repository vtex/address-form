import PropTypes from 'prop-types'
import { injectAddressContext } from './addressContainerContext'
import AddressShapeWithValidation from './propTypes/AddressShapeWithValidation'
import { isValidAddress } from './validateAddress'
import { removeValidation } from './transforms/address'
import { compose } from 'recompose'
import { injectRules } from './addressRulesContext'

const AddressSubmitter = ({
  rules,
  onSubmit,
  onChangeAddress,
  address,
  children,
}) => {
  const handleSubmit = e => {
    e.preventDefault()
    const { valid, address: validatedAddress } = isValidAddress(address, rules)
    onChangeAddress(validatedAddress)
    onSubmit(valid, removeValidation(validatedAddress))
  }

  return children(handleSubmit)
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

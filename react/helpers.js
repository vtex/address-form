import { addValidation, removeValidation } from './transforms/address'
import { injectRules } from './addressRulesContext'
import { injectAddressContext } from './addressContainerContext'
import { isValidAddress, validateField, validateAddress } from './validateAddress'

export default {
  isValidAddress,
  validateField,
  validateAddress,
  injectAddressContext,
  injectRules,
  addValidation,
  removeValidation,
}
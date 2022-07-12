import { addValidation, removeValidation } from './transforms/address'
import { injectRules } from './addressRulesContext'
import { injectAddressContext } from './addressContainerContext'
import {
  isValidAddress,
  validateField,
  validateAddress,
} from './validateAddress'
import getAddressByGeolocation from './geolocation/Utils'

export default {
  isValidAddress,
  validateField,
  validateAddress,
  injectAddressContext,
  injectRules,
  addValidation,
  removeValidation,
  getAddressByGeolocation,
}

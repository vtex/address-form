import type { AddressWithValidation } from '../types/address'
import addressWithObjectValuesBase from './addressWithObjectValuesBase'

export default {
  ...addressWithObjectValuesBase,
  isDisposable: { value: true },
} as AddressWithValidation

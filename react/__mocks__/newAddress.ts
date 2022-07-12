import type { AddressWithValidation } from '../types/address'

export default {
  addressId: { value: '1' },
  addressType: { value: 'residential' as const },
  city: { value: null },
  complement: { value: null },
  country: { value: null },
  geoCoordinates: { value: [] },
  neighborhood: { value: null },
  number: { value: null },
  postalCode: { value: null },
  receiverName: { value: null },
  reference: { value: null },
  state: { value: null },
  street: { value: null },
  addressQuery: { value: null },
  isDisposable: { value: true },
} as AddressWithValidation

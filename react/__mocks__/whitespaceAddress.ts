import type { AddressWithValidation } from '../types/address'

export default {
  addressId: { value: '1' },
  addressType: { value: 'residential' as const },
  city: { value: ' ' },
  complement: { value: ' ' },
  country: { value: 'BRA' },
  geoCoordinates: { value: [] },
  neighborhood: { value: ' ' },
  number: { value: ' ' },
  postalCode: { value: '22231000' },
  receiverName: { value: ' ' },
  reference: { value: ' ' },
  state: { value: 'RJ' },
  street: { value: ' ' },
  addressQuery: { value: null },
  isDisposable: { value: true },
  contactId: { value: null },
} as AddressWithValidation

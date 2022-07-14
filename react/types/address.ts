export type Fields = keyof Address

export type FillableFields = Exclude<
  Fields,
  | 'geoCoordinates'
  | 'isDisposable'
  | 'addressId'
  | 'addressType'
  | 'addressQuery'
>

export type AddressType =
  | 'residential'
  | 'search'
  | 'pickup'
  | 'giftRegistry'
  | 'instore'
  | 'commercial'

export interface Address {
  addressId: string
  addressType: AddressType
  postalCode?: string
  country?: string
  street?: string
  number?: string
  complement?: string
  city?: string
  state?: string
  neighborhood?: string
  reference?: string
  isDisposable?: boolean
  geoCoordinates?: number[]
  receiverName?: string
  addressQuery?: string
}

export type AddressValues = Address[Fields] | null

export interface ValidatedField<Value> {
  value?: Value | null
  valueOptions?: any
  valid?: boolean
  reason?: string
  visited?: boolean
  focus?: boolean
  disabled?: boolean
  postalCodeAutoCompleted?: boolean
  geolocationAutoCompleted?: boolean
  notApplicable?: boolean
}

export type AddressWithValidation = {
  [field in Fields]: ValidatedField<Address[field]>
}

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
  postalCode?: string | null
  country?: string | null
  street?: string | null
  number?: string | null
  complement?: string | null
  city?: string | null
  state?: string | null
  neighborhood?: string | null
  reference?: string | null
  isDisposable?: boolean | null
  geoCoordinates?: number[] | null
  receiverName?: string | null
  addressQuery?: string | null
  contactId?: string | null
}

export type AddressValues = Address[Fields] | null

export interface ValidatedField<Value> {
  value?: Value | null
  valueOptions?: string[]
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

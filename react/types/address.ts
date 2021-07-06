export type Fields = keyof Address

export type FillableFields = Exclude<
  Fields,
  | 'geoCoordinates'
  | 'isDisposable'
  | 'addressId'
  | 'addressType'
  | 'addressQuery'
>

export const enum AddressType {
  RESIDENTIAL = 'residential',
  SEARCH = 'search',
  PICKUP = 'pickup',
  GIFT_REGISTRY = 'giftRegistry',
  INSTORE = 'instore',
  COMMERCIAL = 'commercial',
}

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

export type AddressValues = Address[Fields]

export interface ValidatedField {
  value?: string
  valueOptions?: unknown
  valid?: boolean
  reason?: string
  visited?: boolean
  focus?: boolean
  postalCodeAutocompleted?: boolean
  geolocationAutoCompleted?: boolean
}

export type AddressWithValidation = {
  [field in Fields]: ValidatedField
}

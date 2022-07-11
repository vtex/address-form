import type { PostalCodeSource } from './types/rules'

export const POSTAL_CODE = 'POSTAL_CODE' as const
export const ONE_LEVEL = 'ONE_LEVEL' as const
export const TWO_LEVELS = 'TWO_LEVELS' as const
export const THREE_LEVELS = 'THREE_LEVELS' as const

export const POSTAL_CODE_FROM_TYPES = [
  POSTAL_CODE,
  ONE_LEVEL,
  TWO_LEVELS,
  THREE_LEVELS,
] as PostalCodeSource[]

export const EEMPTY = 'ERROR_EMPTY_FIELD'
export const EADDRESSTYPE = 'ERROR_ADDRESS_TYPE'
export const ENOTOPTION = 'ERROR_VALUE_IS_NOT_AN_OPTION'
export const ECOUNTRY = 'ERROR_COUNTRY_CODE'
export const EGEOCOORDS = 'ERROR_GEO_COORDS'
export const EPOSTALCODE = 'ERROR_POSTAL_CODE'
export const EGOOGLEADDRESS = 'ERROR_GOOGLE_ADDRESS'

export const ERROR_TYPES = [
  EEMPTY,
  EADDRESSTYPE,
  ENOTOPTION,
  ECOUNTRY,
  EGEOCOORDS,
  EPOSTALCODE,
  EGOOGLEADDRESS,
]

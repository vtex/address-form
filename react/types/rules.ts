import type { FillableFields, Fields } from './address'

const enum PostalCodeSource {
  POSTAL_CODE = 'POSTAL_CODE',
  ONE_LEVEL = 'ONE_LEVEL',
  TWO_LEVELS = 'TWO_LEVELS',
  THREE_LEVELS = 'THREE_LEVELS',
}

export interface GeolocationRule {
  valueIn: string
  types: string[]
  required?: boolean
  notApplicable?: boolean
}

export type GeolocationRules = {
  [fieldName in Fields]: GeolocationRule
}

export interface PostalCodeFieldRule {
  name: FillableFields
  label: string
  size: string
  fixedLabel?: string
  mask?: string
  required?: boolean
  regex?: string
  maxLength?: number
  postalCodeAPI?: boolean
  autoComplete?: boolean
  hidden?: boolean
  basedOn?: string
  optionsCaption?: string
  options?: string[]
  optionsPairs?: unknown
  optionsMap?: unknown
  elementName?: string
}

type PostalCodeSummary = {
  name: string
  delimiter?: string
  delimiterAfter?: string
}

export interface PostalCodeRules {
  country: string
  abbr: string
  postalCodeFrom?: PostalCodeSource
  postalCodeProtectedFields?: string[]
  fields: PostalCodeFieldRule[]
  geolocation?: GeolocationRules
  summary?: PostalCodeSummary[][]
}

export type Rule = GeolocationRule | PostalCodeFieldRule

export type AddressRules = PostalCodeRules | GeolocationRules

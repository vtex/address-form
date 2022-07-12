import type { FillableFields, Fields, AddressWithValidation } from './address'
import type {
  firstLevelPostalCodes,
  secondLevelPostalCodes,
  thirdLevelPostalCodes,
} from '../transforms/postalCodes'

export type PostalCodeSource =
  | 'POSTAL_CODE'
  | 'ONE_LEVEL'
  | 'TWO_LEVELS'
  | 'THREE_LEVELS'

export interface GeolocationRule {
  valueIn?: string
  types?: string[]
  required?: boolean
  notApplicable?: boolean
  handler?: (
    address: AddressWithValidation,
    geolocationAddress: unknown,
    pass: number
  ) => AddressWithValidation
}

export type GeolocationRules = {
  [fieldName in Exclude<FillableFields, 'country'>]?: GeolocationRule
}

type RuleLabel = { label: string } | { fixedLabel: string }

export type PostalCodeFieldRule = RuleLabel & {
  name: FillableFields
  size?: string
  mask?: string
  required?: boolean
  regex?: string | RegExp
  maxLength?: number
  postalCodeAPI?: boolean
  autoComplete?: boolean | string
  notApplicable?: boolean
  hidden?: boolean
  basedOn?: Fields
  level?: number
  optionsCaption?: string
  options?: string[]
  optionsPairs?: unknown
  optionsMap?: unknown
  elementName?: string
  forgottenURL?: string
  defaultValue?: unknown
}

type PostalCodeSummary = {
  name: FillableFields
  delimiter?: string
  delimiterAfter?: string
}

export interface PostalCodeRules {
  country: string | null
  abbr: string | null
  postalCodeFrom?: PostalCodeSource
  postalCodeLevels?: FillableFields[]
  postalCodeProtectedFields?: string[]
  firstLevelPostalCodes?: ReturnType<typeof firstLevelPostalCodes>
  secondLevelPostalCodes?: ReturnType<typeof secondLevelPostalCodes>
  thirdLevelPostalCodes?: ReturnType<typeof thirdLevelPostalCodes>
  fields: PostalCodeFieldRule[]
  geolocation?: GeolocationRules
  summary?: PostalCodeSummary[][]
}

export type Rule = GeolocationRule | PostalCodeFieldRule

export type Rules = PostalCodeRules | GeolocationRules

import type { PostalCodeFieldRule } from '../../types/rules'

/** Shared fragments for country rule test fixtures (useOneLevel / useThreeLevels). */
export const mockStreetField: PostalCodeFieldRule = {
  name: 'street',
  label: 'street',
  required: true,
  size: 'xlarge',
}

export const mockNumberField: PostalCodeFieldRule = {
  name: 'number',
  maxLength: 750,
  label: 'number',
  required: true,
  size: 'mini',
}

export const mockComplementField: PostalCodeFieldRule = {
  name: 'complement',
  maxLength: 750,
  label: 'complement',
  size: 'large',
}

export const mockReceiverNameField: PostalCodeFieldRule = {
  name: 'receiverName',
  elementName: 'receiver',
  maxLength: 750,
  label: 'receiverName',
  size: 'large',
  required: true,
}

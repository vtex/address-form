import reduce from 'lodash/reduce'
import difference from 'lodash/difference'
import find from 'lodash/find'
import isPlainObject from 'lodash/isPlainObject'
import isUndefined from 'lodash/isUndefined'
import msk from 'msk'

import { getField } from '../selectors/fields'
import { validateAddress } from '../validateAddress'
import type {
  AddressWithValidation,
  ValidatedField,
  Fields,
  FillableFields,
} from '../types/address'
import type { AddressRules } from '../types/rules'

export function addValidation(address) {
  return reduce(
    address,
    (newAddress, propValue, propName) => {
      const isStringOrArray =
        typeof propValue === 'string' || Array.isArray(propValue)

      newAddress[propName] = {
        value:
          propValue && !isUndefined(propValue.value)
            ? propValue.value
            : isStringOrArray
            ? propValue
            : null,
      }

      return newAddress
    },
    {}
  )
}

export function removeValidation(address) {
  return reduce(
    address,
    (newAddress, propValue, propName) => {
      if (!propValue) {
        newAddress[propName] = propValue

        return newAddress
      }

      newAddress[propName] = isUndefined(propValue.value)
        ? isPlainObject(propValue)
          ? null
          : propValue
        : propValue.value

      return newAddress
    },
    {}
  )
}

export function addNewField<FieldName extends keyof ValidatedField>(
  address: AddressWithValidation,
  fieldName: FieldName,
  value: ValidatedField[FieldName]
): AddressWithValidation {
  const newAddressEntries = Object.entries(address).map(
    ([field, fieldValue]) => {
      return [
        field,
        {
          ...fieldValue,
          [fieldName]: value,
        },
      ]
    }
  )

  return Object.fromEntries(newAddressEntries)
}

export function removeField(address, fieldName) {
  return reduce(
    address,
    (newAddress, prop, propName) => {
      newAddress[propName] = { ...prop }
      delete newAddress[propName][fieldName]

      return newAddress
    },
    {}
  )
}

export function addDisabledToProtectedFields(fields, rules) {
  return reduce(
    fields,
    (newFields, prop, propName) => {
      const hasValue = prop && prop.value
      const isProtectField =
        rules.postalCodeProtectedFields &&
        rules.postalCodeProtectedFields.indexOf(propName) !== -1

      newFields[propName] = prop

      if (isProtectField && hasValue) {
        newFields[propName] = {
          ...prop,
          disabled: true,
        }
      }

      return newFields
    },
    {}
  )
}

const MULTIPLE_OPTIONS_SEPARATOR_REGEX = new RegExp(/;|(?:::)/)

export function handleMultipleValues(fields) {
  return reduce(
    fields,
    (newFields, prop, propName) => {
      const hasMultipleValues = MULTIPLE_OPTIONS_SEPARATOR_REGEX.test(
        prop.value
      )

      newFields[propName] = prop

      if (hasMultipleValues) {
        newFields[propName] = {
          ...prop,
          value: null,
          valueOptions: prop.value.split(MULTIPLE_OPTIONS_SEPARATOR_REGEX),
        }
      }

      return newFields
    },
    {}
  )
}

export function maskFields(addressFields, rules) {
  return reduce(
    addressFields,
    (newAddressFields, prop, propName) => {
      const fieldRule = getField(propName as Fields, rules)

      newAddressFields[propName] = prop

      if (fieldRule && 'mask' in fieldRule && fieldRule.mask) {
        newAddressFields[propName] = {
          ...prop,
          ...(prop.value ? { value: msk(prop.value, fieldRule.mask) } : {}),
        }
      }

      return newAddressFields
    },
    {}
  )
}

export function addFocusToNextInvalidField(
  fields: AddressWithValidation,
  rules: AddressRules
): AddressWithValidation {
  const invalidFilledField = getFirstInvalidFilledField(fields, rules)

  if (invalidFilledField) {
    const { fieldName, field } = invalidFilledField

    return {
      ...fields,
      [fieldName]: field,
    }
  }

  const requiredField = getFirstRequiredFieldNotFilled(fields, rules)

  if (requiredField) {
    const { fieldName, field } = requiredField

    return {
      ...fields,
      [fieldName]: field,
    }
  }

  return addNewField(fields, 'valid', true)
}

function getFirstInvalidFilledField(
  fields: AddressWithValidation,
  rules: AddressRules
) {
  const allFieldsVisited = addNewField(fields, 'visited', true)
  const validatedFields = validateAddress(allFieldsVisited, rules)

  const firstInvalidFieldName = find(
    'fields' in rules
      ? rules.fields.map((field) => field.name)
      : Object.keys(rules),
    (fieldName) =>
      validatedFields[fieldName] && validatedFields[fieldName].valid === false
  ) as FillableFields | undefined

  if (firstInvalidFieldName) {
    return {
      fieldName: firstInvalidFieldName,
      field: {
        ...validatedFields[firstInvalidFieldName],
        focus: true,
      },
    }
  }

  return null
}

function getFirstRequiredFieldNotFilled(
  fields: AddressWithValidation,
  rules: AddressRules
) {
  const requiredFieldsNames =
    'fields' in rules
      ? rules.fields
          .filter((field) => field.required)
          .map((field) => field.name)
      : Object.entries(rules)
          .filter(([, field]) => field.required)
          .map(([fieldName]) => fieldName)

  const fieldsNames = Object.keys(fields)
  const requiredFieldNotFilled = difference(requiredFieldsNames, fieldsNames)

  if (requiredFieldNotFilled && requiredFieldNotFilled.length > 0) {
    const nextRequiredFieldName = requiredFieldNotFilled[0]

    return { fieldName: nextRequiredFieldName, field: { focus: true } }
  }

  return null
}

let gguid = 1

export default function getGGUID() {
  return (gguid++ * new Date().getTime() * -1).toString().replace('-', '')
}

export function createNewAddress(address: Partial<AddressWithValidation> = {}) {
  const {
    addressType,
    city,
    complement,
    country,
    geoCoordinates,
    neighborhood,
    number,
    postalCode,
    receiverName,
    reference,
    state,
    street,
    addressQuery,
    addressId,
  } = address

  return {
    addressId: addressId || { value: getGGUID() },
    addressType: addressType || { value: 'residential' },
    city: city || { value: null },
    complement: complement || { value: null },
    country: country || { value: null },
    geoCoordinates: geoCoordinates || { value: [] },
    neighborhood: neighborhood || { value: null },
    number: number || { value: null },
    postalCode: postalCode || { value: null },
    receiverName: receiverName || { value: null },
    reference: reference || { value: null },
    state: state || { value: null },
    street: street || { value: null },
    addressQuery: addressQuery || { value: '' },
  }
}

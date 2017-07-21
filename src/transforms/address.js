import reduce from 'lodash/reduce'
import filter from 'lodash/filter'
import map from 'lodash/map'
import difference from 'lodash/difference'
import findKey from 'lodash/findKey'
import { getField } from '../selectors/fields'
import { validateChangedFields } from '../validateAddress'
import msk from 'msk'

export function addValidation(address) {
  return reduce(
    address,
    (newAddress, value, propName) => {
      newAddress[propName] = { value }
      return newAddress
    },
    {}
  )
}

export function removeValidation(address) {
  return reduce(
    address,
    (newAddress, { value }, propName) => {
      newAddress[propName] = value
      return newAddress
    },
    {}
  )
}

export function addNewField(address, fieldName, value) {
  return reduce(
    address,
    (newAddress, prop, propName) => {
      newAddress[propName] = {
        ...prop,
        [fieldName]: value,
      }
      return newAddress
    },
    {}
  )
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

export function handleMultipleValues(fields) {
  return reduce(
    fields,
    (newFields, prop, propName) => {
      const hasMultipleValues = prop.value.indexOf(';') !== -1

      newFields[propName] = prop

      if (hasMultipleValues) {
        newFields[propName] = {
          ...prop,
          value: null,
          valueOptions: prop.value.split(';'),
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
      const fieldRule = getField(propName, rules)

      newAddressFields[propName] = prop

      if (fieldRule && fieldRule.mask) {
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

export function addFocusToNextInvalidField(fields, rules) {
  const allFieldsVisited = addNewField(fields, 'visited', true)
  const validatedFields = validateChangedFields(
    allFieldsVisited,
    allFieldsVisited,
    rules
  )

  const firstInvalidFieldName = findKey(
    validatedFields,
    field => field.valid === false
  )

  if (firstInvalidFieldName) {
    return {
      ...fields,
      [firstInvalidFieldName]: {
        ...validatedFields[firstInvalidFieldName],
        focus: true,
      },
    }
  }

  const requiredFields = filter(rules.fields, field => field.required)
  const requiredFieldsNames = map(requiredFields, field => field.name)

  const fieldsNames = Object.keys(fields)
  const requiredFieldNotFilled = difference(requiredFieldsNames, fieldsNames)

  if (requiredFieldNotFilled && requiredFieldNotFilled.length > 0) {
    const nextRequiredFieldName = requiredFieldNotFilled[0]

    return {
      ...fields,
      [nextRequiredFieldName]: { focus: true },
    }
  }

  return fields
}

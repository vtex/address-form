import reduce from 'lodash/reduce'
import filter from 'lodash/filter'
import map from 'lodash/map'
import difference from 'lodash/difference'
import find from 'lodash/find'
import isPlainObject from 'lodash/isPlainObject'
import isUndefined from 'lodash/isUndefined'
import { getField } from '../selectors/fields'
import { validateAddress } from '../validateAddress'
import msk from 'msk'

export function addValidation(address) {
  return reduce(
    address,
    (newAddress, propValue, propName) => {
      newAddress[propName] = {
        value:
          propValue && !isUndefined(propValue.value)
            ? propValue.value
            : propValue,
      }
      return newAddress
    },
    {},
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
    {},
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
    {},
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
    {},
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
    {},
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
    {},
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
    {},
  )
}

export function addFocusToNextInvalidField(fields, rules) {
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

  return fields
}

function getFirstInvalidFilledField(fields, rules) {
  const allFieldsVisited = addNewField(fields, 'visited', true)
  const validatedFields = validateAddress(allFieldsVisited, rules)

  const firstInvalidField = find(
    rules.fields,
    field =>
      validatedFields[field.name] &&
      validatedFields[field.name].valid === false,
  )

  if (firstInvalidField) {
    return {
      fieldName: firstInvalidField.name,
      field: {
        ...validatedFields[firstInvalidField.name],
        focus: true,
      },
    }
  }

  return null
}

function getFirstRequiredFieldNotFilled(fields, rules) {
  const requiredFields = filter(rules.fields, field => field.required)
  const requiredFieldsNames = map(requiredFields, field => field.name)

  const fieldsNames = Object.keys(fields)
  const requiredFieldNotFilled = difference(requiredFieldsNames, fieldsNames)

  if (requiredFieldNotFilled && requiredFieldNotFilled.length > 0) {
    const nextRequiredFieldName = requiredFieldNotFilled[0]

    return { fieldName: nextRequiredFieldName, field: { focus: true } }
  }

  return null
}

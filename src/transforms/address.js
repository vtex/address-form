import reduce from 'lodash/reduce'
import filter from 'lodash/filter'
import map from 'lodash/map'
import difference from 'lodash/difference'
import find from 'lodash/find'
import findIndex from 'lodash/findIndex'
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
  const validatedFields = validateChangedFields(
    allFieldsVisited,
    allFieldsVisited,
    rules
  )

  const orderedValidatedFields = orderFieldsByRules(validatedFields, rules)

  const firstInvalidField = find(
    orderedValidatedFields,
    field => field && field.valid === false
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

function orderFieldsByRules(fields, rules) {
  return reduce(
    fields,
    (acc, field, fieldName) => {
      const index = findIndex(
        rules.fields,
        ruleField => ruleField.name === fieldName
      )
      if (index === -1) return acc

      acc[index] = { ...field, name: fieldName }
      return acc
    },
    Array(Object.keys(fields).length)
  )
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

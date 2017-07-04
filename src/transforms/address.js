import reduce from 'lodash/reduce'

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


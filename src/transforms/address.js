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

export function mergeValidation(changedFields, address) {
  return reduce(
    changedFields,
    (result, value, fieldName) => {
      result[fieldName] = {
        ...address[fieldName],
        value,
      }
      return result
    },
    {}
  )
}

import { getAddress } from './postalCodeService'
import {
  addValidation,
  addNewField,
  addDisabledToProtectedFields,
  handleMultipleValues,
  maskFields,
} from './transforms/address'
import flow from 'lodash/flow'
import pickBy from 'lodash/pickBy'

export default function postalCodeAutoCompleteAddress(
  address,
  accountName,
  rules,
  callback
) {
  getAddress({
    accountName,
    country: address.country.value,
    postalCode: address.postalCode.value,
  }).then(responseAddress => {
    const autoCompletedFields = flow([
      fields =>
        pickBy(
          fields,
          field => field !== null && field !== '' && field !== undefined
        ),
      fields => addValidation(fields, address),
      fields => handleMultipleValues(fields),
      fields => maskFields(rules, fields),
      fields => addNewField(fields, 'postalCodeAutoCompleted', true),
      fields => addDisabledToProtectedFields(fields, rules),
      removePostalCodeLoading,
    ])(responseAddress)

    callback(autoCompletedFields)
  })

  return addPostalCodeLoading(address)
}

function addPostalCodeLoading(address) {
  return {
    ...address,
    postalCode: {
      ...address.postalCode,
      loading: true,
    },
  }
}

function removePostalCodeLoading(address) {
  return {
    ...address,
    postalCode: {
      ...address.postalCode,
      loading: undefined,
      valid: true,
    },
  }
}

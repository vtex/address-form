import { getAddress } from './__mocks__/postalCodeService'
import { mergeValidation, addNewField } from './transforms/address'
import flow from 'lodash/flow'

export default function autoCompleteAddress(
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
      fields => mergeValidation(fields, address),
      fields => addNewField(fields, 'autoCompleted', true),
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

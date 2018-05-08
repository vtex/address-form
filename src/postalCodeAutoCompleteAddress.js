import { getAddress } from './postalCodeService'
import {
  addValidation,
  addNewField,
  addDisabledToProtectedFields,
  handleMultipleValues,
  maskFields,
  addFocusToNextInvalidField,
} from './transforms/address'
import flow from 'lodash/flow'
import pickBy from 'lodash/pickBy'
import isNil from 'lodash/isNil'

export default function postalCodeAutoCompleteAddress({
  cors,
  accountName,
  address,
  rules,
  callback,
  shouldAddFocusToNextInvalidField = true,
}) {
  getAddress({
    cors,
    accountName,
    country: address.country.value,
    postalCode: address.postalCode.value,
  })
    .then(responseAddress => {
      const functionsFlow = [
        fields => pickBy(fields, field => !isNil(field) && field !== ''),
        fields => addValidation(fields, address),
        fields => handleMultipleValues(fields),
        fields => maskFields(fields, rules),
        fields => addNewField(fields, 'postalCodeAutoCompleted', true),
        fields => addDisabledToProtectedFields(fields, rules),
        removePostalCodeLoading,
        ...(shouldAddFocusToNextInvalidField
          ? [fields => addFocusToNextInvalidField(fields, rules)]
          : []),
      ]

      const autoCompletedFields = flow(functionsFlow)(responseAddress)

      callback(autoCompletedFields)
    })
    .catch(() => {
      let newFields = removePostalCodeLoading(address)
      newFields = addFocusToNextInvalidField(newFields, rules)
      callback(newFields)
    })
    .catch(
      /* istanbul ignore next */ error => {
        // If the Jest test case that tests the catch() above fails,
        // the promise will catch the error and go to this branch
        // of the code. This console error makes the Jest error visible.
        console.error(error)
      },
    )

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

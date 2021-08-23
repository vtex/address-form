import flow from 'lodash/flow'

import getCountryISO2 from '../countryISOMap'
import {
  addNewField,
  addFocusToNextInvalidField,
  createNewAddress,
} from '../transforms/address'

export default function geolocationAutoCompleteAddress(
  baseAddress,
  googleAddress,
  rules
) {
  const geolocationRules = rules.geolocation
  const fallbackCountry = rules.country

  let address = flow([
    setAddressFields,
    runGeolocationFieldHandlers,
    setGeoCoordinates,
    setCountry,
    setAddressQuery,
    (updatedAddress) =>
      addNewField(
        updatedAddress,
        'geolocationAutoCompleted',
        (fieldValue) => fieldValue?.value !== null
      ),
    (updatedAddress) => ({
      ...updatedAddress,
      addressId: baseAddress.addressId,
      addressType: baseAddress.addressType,
      receiverName: baseAddress.receiverName,
    }),
    (updatedAddress) => addFocusToNextInvalidField(updatedAddress, rules),
  ])()

  // unnecessary for 3.6.0+, but necessary for backward compatibility
  // for lib consumers that don't pass `useGeolocation` to the `<AddressRules/>`
  if (!rules._usingGeolocationRules) {
    address = setNumberNotApplicable(address)
  }

  // The functions below use googleAddress and geolocationRules
  // from the closure created.

  function setAddressFields() {
    return Object.entries(geolocationRules).reduce(
      (updatedAddress, [fieldName, fieldValue]) => {
        const component = getAddressComponent(
          googleAddress.address_components,
          fieldValue.types
        )

        if (component) {
          updatedAddress = setAddressFieldValue(
            updatedAddress,
            fieldName,
            geolocationRules,
            component
          )
        }

        return updatedAddress
      },
      createNewAddress()
    )
  }

  function setGeoCoordinates(updatedAddress) {
    const { location } = googleAddress.geometry

    updatedAddress.geoCoordinates = {
      visited: true,
      value: [
        typeof location.lng === 'function' ? location.lng() : location.lng,
        typeof location.lat === 'function' ? location.lat() : location.lat,
      ],
    }

    return updatedAddress
  }

  // Run custom function handlers to fill some fields
  function runGeolocationFieldHandlers(updatedAddress) {
    const ruleEntries = Object.entries(geolocationRules)

    ruleEntries.forEach(([, rule]) => {
      if (rule.handler) {
        updatedAddress = rule.handler(updatedAddress, googleAddress)
      }
    })

    ruleEntries.forEach(([, rule]) => {
      if (rule.handler) {
        updatedAddress = rule.handler(updatedAddress, googleAddress)
      }
    })

    return updatedAddress
  }

  function setCountry(updatedAddress) {
    const country = getCountry(googleAddress)

    updatedAddress.country = { value: country || fallbackCountry }

    return updatedAddress
  }

  function setAddressQuery(updatedAddress) {
    updatedAddress.addressQuery = { value: googleAddress.formatted_address }

    return updatedAddress
  }

  function setNumberNotApplicable(updatedAddress) {
    const geolocationNumberCondition =
      geolocationRules &&
      geolocationRules.number &&
      geolocationRules.number.notApplicable

    if (geolocationNumberCondition) {
      return {
        ...updatedAddress,
        number: {
          ...updatedAddress.number,
          notApplicable: true,
        },
      }
    }

    return updatedAddress
  }

  return address
}

function getAddressComponent(addressComponents, types) {
  for (const type of types ?? []) {
    const addressComponent = addressComponents.find((component) =>
      component.types.includes(type)
    )

    if (addressComponent) {
      return addressComponent
    }
  }

  return undefined
}

function setAddressFieldValue(
  address,
  fieldName,
  geolocationRules,
  addressComponent
) {
  const geolocationField = geolocationRules[fieldName]

  address[fieldName] = { value: addressComponent[geolocationField.valueIn] }

  return address
}

function getCountry(googleAddress) {
  const countryComponent = googleAddress.address_components.find(
    (component) => component.types.indexOf('country') !== -1
  )

  return countryComponent ? getCountryISO2(countryComponent.short_name) : null
}

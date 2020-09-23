import flow from 'lodash/flow'

import getCountryISO2 from '../countryISOMap'
import { addNewField, addFocusToNextInvalidField } from '../transforms/address'

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
      addNewField(updatedAddress, 'geolocationAutoCompleted', true),
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
    const indexedRules = revertRuleIndex(geolocationRules)

    return googleAddress.address_components.reduce(
      (updatedAddress, component) => {
        const checkoutFieldName = getCheckoutFieldName(
          component.types,
          indexedRules
        )

        if (checkoutFieldName) {
          updatedAddress = setAddressFieldValue(
            updatedAddress,
            checkoutFieldName,
            geolocationRules,
            component
          )
        }

        return updatedAddress
      },
      {}
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

/** This function creates a map like this:
 * {
 *   "postal_code": "postalCode",
 *   "street_number": "number",
 *   "route": "street",
 *   "neighborhood": "neighborhood",
 *   "sublocality_level_1": "neighborhood",
 *   "sublocality_level_2": "neighborhood",
 *   "sublocality_level_3": "neighborhood",
 *   "sublocality_level_4": "neighborhood",
 *   "sublocality_level_5": "neighborhood",
 *   "administrative_area_level_1": "state",
 *   "administrative_area_level_2": "city",
 *   "locality": "city"
 * }
 * So it's easy to find which Google address type matches ours
 */
function revertRuleIndex(geolocationRules) {
  return Object.entries(geolocationRules).reduce((acc, [propName, value]) => {
    for (let i = 0; i < value.types.length; i++) {
      const type = value.types[i]

      acc[type] = propName
    }

    return acc
  }, {})
}

// Return the matched checkout field name
function getCheckoutFieldName(types, indexedRules) {
  const mappedType = types.find((type) => indexedRules[type])

  return mappedType ? indexedRules[mappedType] : null
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

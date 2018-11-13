import isFunction from 'lodash/isFunction'
import find from 'lodash/find'
import reduce from 'lodash/reduce'
import map from 'lodash/map'
import getCountryISO2 from '../countryISOMap'
import flow from 'lodash/flow'
import { addNewField, addFocusToNextInvalidField } from '../transforms/address'

export default function geolocationAutoCompleteAddress(
  baseAddress,
  googleAddress,
  rules,
) {
  const geolocationRules = rules.geolocation
  const fallbackCountry = rules.country

  const address = flow([
    setAddressFields,
    runGeolocationFieldHandlers,
    setGeoCoordinates,
    setCountry,
    setAddressQuery,
    address => addNewField(address, 'geolocationAutoCompleted', true),
    address => ({
      ...address,
      addressId: baseAddress.addressId,
      addressType: baseAddress.addressType,
      receiverName: baseAddress.receiverName,
    }),
    address => addFocusToNextInvalidField(address, rules),
  ])()

  // The functions below use googleAddress and geolocationRules
  // from the closure created.

  function setAddressFields() {
    const indexedRules = revertRuleIndex(geolocationRules)

    return reduce(
      googleAddress.address_components,
      (address, component) => {
        const checkoutFieldName = getCheckoutFieldName(
          component.types,
          indexedRules,
        )

        if (checkoutFieldName) {
          address = setAddressFieldValue(
            address,
            checkoutFieldName,
            geolocationRules,
            component,
          )
        }

        return address
      },
      {},
    )
  }

  function setGeoCoordinates(address) {
    const location = googleAddress.geometry.location

    address.geoCoordinates = {
      visited: true,
      value: [
        isFunction(location.lng) ? location.lng() : location.lng,
        isFunction(location.lat) ? location.lat() : location.lat,
      ],
    }

    return address
  }

  // Run custom function handlers to fill some fields
  function runGeolocationFieldHandlers(address) {
    map(geolocationRules, (rule, propName) => {
      if (rule.handler) {
        address = rule.handler(address, googleAddress)
      }
    })

    map(geolocationRules, (rule, propName) => {
      if (rule.handler) {
        address = rule.handler(address, googleAddress)
      }
    })

    return address
  }

  function setCountry(address) {
    const country = getCountry(googleAddress)
    address.country = { value: country || fallbackCountry }
    return address
  }

  function setAddressQuery(address) {
    address.addressQuery = { value: googleAddress.formatted_address }

    return address
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
 **/
function revertRuleIndex(geolocationRules) {
  return reduce(
    geolocationRules,
    (acc, value, propName) => {
      for (let i = 0; i < value.types.length; i++) {
        const type = value.types[i]
        acc[type] = propName
      }
      return acc
    },
    {},
  )
}

// Return the matched checkout field name
function getCheckoutFieldName(types, indexedRules) {
  const mappedType = find(types, type => indexedRules[type])
  return mappedType ? indexedRules[mappedType] : null
}

function setAddressFieldValue(
  address,
  fieldName,
  geolocationRules,
  addressComponent,
) {
  const geolocationField = geolocationRules[fieldName]
  address[fieldName] = { value: addressComponent[geolocationField.valueIn] }
  return address
}

function getCountry(googleAddress) {
  const countryComponent = find(
    googleAddress.address_components,
    component => component.types.indexOf('country') !== -1,
  )

  return countryComponent ? getCountryISO2(countryComponent.short_name) : null
}

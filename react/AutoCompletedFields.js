import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation from './propTypes/AddressShapeWithValidation'
import AddressSummary from './AddressSummary'
import { removeValidation, removeField } from './transforms/address'
import pickBy from 'lodash/pickBy'
import find from 'lodash/find'
import flow from 'lodash/flow'
import { injectRules } from './addressRulesContext'
import { injectAddressContext } from './addressContainerContext'
import { compose } from 'recompose'

const IRRELEVANT_FIELDS = ['country', 'geoCoordinates']

const removeAutoCompletedFields = flow([
  address => removeField(address, 'postalCodeAutoCompleted'),
  address => removeField(address, 'geolocationAutoCompleted'),
])

class AutoCompletedFields extends Component {
  handleClickChange = e => {
    e.preventDefault()
    const { address, onChangeAddress } = this.props

    onChangeAddress(removeAutoCompletedFields(address))
  };

  filterRelevantFields(address) {
    return pickBy(address, (field, name) => {
      const autoCompleted = field.postalCodeAutoCompleted ||
        field.geolocationAutoCompleted

      const postalCodeGeolocationAutoCompleted = name !== 'postalCode' ||
        (name === 'postalCode' && field.geolocationAutoCompleted)

      const isRelevantField = IRRELEVANT_FIELDS.indexOf(name) === -1
      const hasValue = address[name].value && address[name].value.length > 0

      return autoCompleted &&
        hasValue &&
        postalCodeGeolocationAutoCompleted &&
        isRelevantField
    })
  }

  isEmpty(address) {
    return Object.keys(address).length === 0
  }

  render() {
    const { address, rules, children } = this.props

    const filteredAddress = this.filterRelevantFields(address)

    if (this.isEmpty(filteredAddress)) {
      return null
    }

    return (
      <AddressSummary
        canEditData
        showCountry={false}
        address={{
          ...removeValidation(filteredAddress),
          addressId: '',
          addressType: 'residential',
        }}
        rules={rules}
      >
        <span> - </span>
        {React.Children.map(children, child => React.cloneElement(child, {
          onClick: this.handleClickChange,
        }))}
      </AddressSummary>
    )
  }
}

AutoCompletedFields.propTypes = {
  children: PropTypes.node.isRequired,
  address: AddressShapeWithValidation,
  rules: PropTypes.object.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
}

const enhance = compose(injectAddressContext, injectRules)
export default enhance(AutoCompletedFields)

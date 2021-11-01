import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'

import AddressShapeWithValidation from './propTypes/AddressShapeWithValidation'
import InputFieldContainer from './InputFieldContainer'
import DefaultInput from './inputs/DefaultInput'
import { injectAddressContext } from './addressContainerContext'

class CountrySelector extends Component {
  handleChangeCountry = (changedFields) => {
    const { address } = this.props

    if (changedFields.country.value === address.country.value) return

    this.props.onChangeAddress({
      country: { value: changedFields.country.value },
      city: { value: null },
      complement: { value: null },
      geoCoordinates: { value: [] },
      neighborhood: { value: null },
      number: { value: null },
      postalCode: { value: null },
      reference: { value: null },
      state: { value: null },
      street: { value: null },
    })
  }

  shouldComponentUpdate(prevProps) {
    return (
      prevProps.address.country !== this.props.address.country ||
      prevProps.rules !== this.props.rules ||
      prevProps.Input !== this.props.Input ||
      prevProps.shipsTo !== this.props.shipsTo
    )
  }

  sortOptionsByLabel(options) {
    return options.slice().sort((a, b) => a.label.localeCompare(b.label))
  }

  render() {
    const { address, shipsTo, Input, intl, rules } = this.props
    // rules?.fields?.find gives the possibility of overwriting the country selector field rules.
    const field = rules?.fields?.find(({ name }) => name === 'country') ?? {
      name: 'country',
      label: 'country',
      optionsCaption: false,
      value: address.country.value,
    }

    return (
      <InputFieldContainer
        intl={intl}
        Input={Input}
        field={field}
        rules={rules}
        options={this.sortOptionsByLabel(shipsTo)}
        address={address}
        onChangeAddress={this.handleChangeCountry}
      />
    )
  }
}

CountrySelector.defaultProps = {
  Input: DefaultInput,
  rules: {},
}

CountrySelector.propTypes = {
  Input: PropTypes.func,
  intl: intlShape,
  address: AddressShapeWithValidation,
  shipsTo: PropTypes.array.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
  rules: PropTypes.object,
}

export default injectAddressContext(injectIntl(CountrySelector))

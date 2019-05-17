import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation from './propTypes/AddressShapeWithValidation'
import InputFieldContainer from './InputFieldContainer'
import DefaultInput from './inputs/DefaultInput'
import { injectAddressContext } from './addressContainerContext'
import { intlShape, injectIntl } from 'react-intl'

class CountrySelector extends Component {
  handleChangeCountry = changedFields => {
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
    if (prevProps.address.country.value !== this.props.address.country.value) {
      return true
    }

    if (prevProps.Input !== this.props.Input) {
      return true
    }

    if (prevProps.shipsTo !== this.props.shipsTo) {
      return true
    }

    return false
  }

  sortOptionsByLabel(options) {
    return options.slice().sort((a, b) => a.label.localeCompare(b.label))
  }

  render() {
    const { address, shipsTo, Input, intl } = this.props
    const field = {
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
        rules={{}}
        options={this.sortOptionsByLabel(shipsTo)}
        address={address}
        onChangeAddress={this.handleChangeCountry}
      />
    )
  }
}

CountrySelector.defaultProps = {
  Input: DefaultInput,
}

CountrySelector.propTypes = {
  Input: PropTypes.func,
  intl: intlShape,
  address: AddressShapeWithValidation,
  shipsTo: PropTypes.array.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
}

export default injectAddressContext(injectIntl(CountrySelector))

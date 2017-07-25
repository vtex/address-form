import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation from './propTypes/AddressShapeWithValidation'
import InputFieldContainer from './InputFieldContainer'
import DefaultInput from './DefaultInput'

class CountrySelector extends Component {
  handleChangeCountry = changedFields => {
    this.props.onChangeAddress({
      country: { value: changedFields.country.value },
      city: { value: null },
      complement: { value: null },
      geoCoordinates: { value: null },
      neighborhood: { value: null },
      number: { value: null },
      postalCode: { value: null },
      reference: { value: null },
      state: { value: null },
      street: { value: null },
    })
  }

  sortOptionsByLabel(options) {
    return options.sort((a, b) => a.label.localeCompare(b.label))
  }

  render() {
    const { address, shipsTo, Input } = this.props
    const field = {
      name: 'country',
      label: 'country',
      optionsCaption: false,
    }

    return (
      <InputFieldContainer
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
  address: AddressShapeWithValidation,
  shipsTo: PropTypes.array.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
}

export default CountrySelector

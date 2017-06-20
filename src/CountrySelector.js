import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation from './propTypes/AddressShapeWithValidation'
import InputLabel from './addressInputs/InputLabel'
import InputSelect from './addressInputs/InputSelect'

class CountrySelector extends Component {
  handleChangeCountry = countryField => {
    this.props.onChangeAddress({
      ...countryField,
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
  };

  addCountryTranslations(country) {
    return {
      value: country,
      label: country, // TODO use translation function
    }
  }

  sortOptionsByLabel(options) {
    return options.sort((a, b) => a.label.localeCompare(b.label))
  }

  render() {
    const { address, shipsTo } = this.props
    const field = {
      name: 'country',
      label: 'country',
      optionsCaption: false,
      optionsPairs: this.sortOptionsByLabel(
        shipsTo.map(this.addCountryTranslations)
      ),
    }

    return (
      <InputLabel field={field}>
        <InputSelect
          field={field}
          rules={{}}
          address={address}
          onChange={this.handleChangeCountry}
        />
      </InputLabel>
    )
  }
}

CountrySelector.propTypes = {
  address: PropTypes.shape(AddressShapeWithValidation),
  shipsTo: PropTypes.array.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
}

export default CountrySelector

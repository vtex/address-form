import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation from './propTypes/AddressShapeWithValidation'
import InputLabel from './addressInputs/InputLabel'
import InputSelect from './addressInputs/InputSelect'

class CountrySelector extends Component {
  handleChangeCountry = countryField => {
    this.props.onChangeAddress({
      ...countryField,
      postalCode: { value: null },
      state: { value: null },
      city: { value: null },
      neighborhood: { value: null },
    })
  };

  render() {
    const { address, shipsTo } = this.props
    const field = { name: 'country', label: 'country', options: shipsTo }

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

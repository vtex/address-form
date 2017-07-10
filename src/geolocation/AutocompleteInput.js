import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DefaultInput from '../addressInputs/Input'
import AddressShapeWithValidation from '../propTypes/AddressShapeWithValidation'
import geolocationAutoCompleteAddress from './geolocationAutoCompleteAddress'
import { EGOOGLEADDRESS } from '../constants'

class AutocompleteInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      address: this.props.address,
    }

    this.handleMountInput = this.handleMountInput.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      adddres: nextProps.address,
    })
  }

  handleMountInput = input => {
    if (!input) {
      this.input = null
      this.autocomplete = null
      this.autocompleteListener.remove()
      return
    }

    this.input = input

    const options = {
      types: ['address'],
      componentRestrictions: {
        country: this.props.rules.abbr,
      },
    }

    this.autocomplete = new this.props.googleMaps.places.Autocomplete(
      this.input,
      options
    )

    if (this.autocompleteListener) {
      this.autocompleteListener.remove()
    }

    this.autocompleteListener = this.props.googleMaps.event.addListener(
      this.autocomplete,
      'place_changed',
      () => {
        const googleAddress = this.autocomplete.getPlace()
        const isValidAddress = !!googleAddress.geometry
        if (isValidAddress === false) {
          this.setState({ invalidGoogleAddress: true })
          return
        }
        this.setState({ invalidGoogleAddress: false })
        this.handlePlaceChanged(googleAddress)
      }
    )
  }

  handlePlaceChanged = googleAddress => {
    this.props.onChangeAddress(
      geolocationAutoCompleteAddress(
        googleAddress,
        this.props.rules.geolocation,
        this.props.rules.country
      )
    )
  }

  handleChangeInput = value => {
    this.setState(prevState => ({
      address: {
        ...prevState.address,
        addressQuery: {
          ...prevState.addressQuery,
          value,
        },
      },
    }))
  }

  render() {
    const { Input, rules, loadingGoogle } = this.props
    const { address, invalidGoogleAddress } = this.state

    const newAddress = {
      ...address,
      addressQuery: {
        ...(address.addressQuery ? address.addressQuery : { value: '' }),
        ...(invalidGoogleAddress
          ? { valid: false, reason: EGOOGLEADDRESS }
          : {}),
        loading: loadingGoogle,
      },
    }

    return (
      <Input
        key={rules.country}
        field={{
          label: 'addressQuery',
          name: 'addressQuery',
        }}
        options={null}
        address={newAddress}
        onChange={!loadingGoogle ? this.handleChangeInput : () => {}}
        onBlur={value => console.log(value)}
        inputRef={!loadingGoogle ? this.handleMountInput : undefined}
      />
    )
  }
}

AutocompleteInput.defaultProps = {
  Input: DefaultInput,
}

AutocompleteInput.propTypes = {
  Input: PropTypes.func,
  rules: PropTypes.object.isRequired,
  address: AddressShapeWithValidation.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
  loadingGoogle: PropTypes.bool,
  googleMaps: PropTypes.object,
}

export default AutocompleteInput

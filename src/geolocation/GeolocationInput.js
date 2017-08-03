import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DefaultInput from '../DefaultInput'
import AddressShapeWithValidation from '../propTypes/AddressShapeWithValidation'
import geolocationAutoCompleteAddress from './geolocationAutoCompleteAddress'
import { EGOOGLEADDRESS } from '../constants'

class GeolocationInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      address: this.props.address,
    }

    this.handleMountInput = this.handleMountInput.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      address: nextProps.address,
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
        const isValidGoogleAddress = !!googleAddress.geometry
        if (isValidGoogleAddress) {
          this.setState({ isValidGoogleAddress })
          this.handleChangeInput(googleAddress.formatted_address)
          this.handlePlaceChanged(googleAddress)
          return
        }
        this.setState({ isValidGoogleAddress })
      }
    )
  }

  handlePlaceChanged = googleAddress => {
    const address = geolocationAutoCompleteAddress(
      this.state.address,
      googleAddress,
      this.props.rules
    )

    this.props.onChangeAddress(address)
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
    const { Input, rules, loadingGoogle, inputProps } = this.props
    const { address, isValidGoogleAddress } = this.state

    const newAddress = {
      ...address,
      addressQuery: {
        ...(address.addressQuery ? address.addressQuery : { value: '' }),
        ...(isValidGoogleAddress === false
          ? { valid: false, reason: EGOOGLEADDRESS }
          : {}),
        loading: loadingGoogle,
      },
    }

    return (
      <Input
        {...inputProps}
        key={rules.country}
        field={{
          label: 'addressQuery',
          name: 'addressQuery',
        }}
        options={null}
        address={newAddress}
        onChange={!loadingGoogle ? this.handleChangeInput : () => {}}
        inputRef={!loadingGoogle ? this.handleMountInput : undefined}
      />
    )
  }
}

GeolocationInput.defaultProps = {
  Input: DefaultInput,
  inputProps: {},
}

GeolocationInput.propTypes = {
  Input: PropTypes.func,
  inputProps: PropTypes.object,
  rules: PropTypes.object.isRequired,
  address: AddressShapeWithValidation.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
  loadingGoogle: PropTypes.bool,
  googleMaps: PropTypes.object,
}

export default GeolocationInput

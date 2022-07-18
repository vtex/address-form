import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'

import DefaultInput from '../inputs/DefaultInput'
import AddressShapeWithValidation from '../propTypes/AddressShapeWithValidation'
import geolocationAutoCompleteAddress from './geolocationAutoCompleteAddress'
import { EGOOGLEADDRESS } from '../constants'
import { injectRules } from '../addressRulesContext'
import { injectAddressContext } from '../addressContainerContext'
import { injectIntl } from '../intl/utils'

class GeolocationInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      address: this.props.address,
    }

    this.handleMountInput = this.handleMountInput.bind(this)
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      address: nextProps.address,
    })
  }

  handleMountInput = (input) => {
    const { useSearchBox, rules, googleMaps } = this.props

    if (this.autocompleteListener) {
      this.autocompleteListener.remove()
      this.autocompleteListener = null
    }

    if (!input) {
      this.input = null
      this.autocomplete = null

      return
    }

    this.input = input

    const options = rules.abbr
      ? {
          types: ['address'],
          componentRestrictions: {
            country: rules.abbr,
          },
        }
      : { types: ['address'] }

    if (useSearchBox) {
      this.autocomplete = new googleMaps.places.SearchBox(this.input)
      this.geocoder = new googleMaps.Geocoder()
    } else {
      this.autocomplete = new googleMaps.places.Autocomplete(
        this.input,
        options
      )
    }

    this.autocompleteListener = useSearchBox
      ? this.addSearchBoxListener()
      : this.addAutocompleteListener()
  }

  addAutocompleteListener = () => {
    const { autocomplete } = this

    return this.props.googleMaps.event.addListener(
      this.autocomplete,
      'place_changed',
      () => {
        const googleAddress = autocomplete.getPlace()

        if (googleAddress.geometry) {
          this.handleAddress(googleAddress)
        }
      }
    )
  }

  addSearchBoxListener = () => {
    return this.props.googleMaps.event.addListener(
      this.autocomplete,
      'places_changed',
      () => {
        const googleAddresses = this.autocomplete.getPlaces()
        let firstPlaceFound = googleAddresses && googleAddresses[0]

        if (!firstPlaceFound) return

        if (!firstPlaceFound.address_components) {
          this.geocoder.geocode(
            { address: firstPlaceFound.formatted_address },
            (address) => (firstPlaceFound = address)
          )
        }

        if (firstPlaceFound.geometry) {
          this.handleAddress(firstPlaceFound)
        }
      }
    )
  }

  handleAddress = (googleAddress) => {
    this.handleChangeInput(googleAddress.formatted_address)
    this.handlePlaceChanged(googleAddress)
  }

  handlePlaceChanged = (googleAddress) => {
    const address = geolocationAutoCompleteAddress(
      this.state.address,
      googleAddress,
      this.props.rules
    )

    this.props.onChangeAddress(address)
  }

  handleChangeInput = (value) => {
    this.setState((prevState) => ({
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
    const {
      Input,
      rules,
      loadingGoogle,
      inputProps,
      placeholder,
      autoFocus,
    } = this.props

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
        placeholder={placeholder}
        autoFocus={autoFocus}
        onChange={!loadingGoogle ? this.handleChangeInput : () => {}}
        inputRef={!loadingGoogle ? this.handleMountInput : undefined}
      />
    )
  }
}

GeolocationInput.defaultProps = {
  Input: DefaultInput,
  inputProps: {},
  autofocus: false,
  useSearchBox: false,
}

GeolocationInput.propTypes = {
  Input: PropTypes.func,
  inputProps: PropTypes.object,
  placeholder: PropTypes.string,
  useSearchBox: PropTypes.bool,
  rules: PropTypes.object.isRequired,
  address: AddressShapeWithValidation.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
  loadingGoogle: PropTypes.bool,
  autoFocus: PropTypes.bool,
  googleMaps: PropTypes.object,
}

const enhance = compose(injectAddressContext, injectRules, injectIntl)

export default enhance(GeolocationInput)

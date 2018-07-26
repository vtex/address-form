import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DefaultInput from '../inputs/DefaultInput'
import AddressShapeWithValidation from '../propTypes/AddressShapeWithValidation'
import geolocationAutoCompleteAddress from './geolocationAutoCompleteAddress'
import { EGOOGLEADDRESS } from '../constants'
import { injectRules } from '../addressRulesContext'
import { compose } from 'recompose'
import { injectAddressContext } from '../addressContainerContext'

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
    const { useSearchBox, rules, googleMaps } = this.props

    if (!input) {
      this.input = null
      this.autocomplete = null
      this.autocompleteListener.remove()
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
        options,
      )
    }

    if (this.autocompleteListener) {
      this.autocompleteListener.remove()
    }

    this.autocompleteListener = useSearchBox
      ? this.addSearchBoxListener()
      : this.addAutocompleteListener()
  }

  addAutocompleteListener = () => {
    return this.props.googleMaps.event.addListener(
      this.autocomplete,
      'place_changed',
      () => {
        const googleAddress = this.autocomplete.getPlace()

        if (googleAddress.geometry) {
          this.handleAddress(googleAddress)
          return
        }
      },
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
            address => (firstPlaceFound = address),
          )
        }

        if (firstPlaceFound.geometry) {
          this.handleAddress(firstPlaceFound)
          return
        }
      },
    )
  }

  handleAddress = googleAddress => {
    this.handleChangeInput(googleAddress.formatted_address)
    this.handlePlaceChanged(googleAddress)
  }

  handlePlaceChanged = googleAddress => {
    const address = geolocationAutoCompleteAddress(
      this.state.address,
      googleAddress,
      this.props.rules,
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

const enhance = compose(
  injectAddressContext,
  injectRules,
)
export default enhance(GeolocationInput)

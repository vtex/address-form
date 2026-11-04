import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import debounce from 'lodash/debounce'

import DefaultInput from '../inputs/DefaultInput'
import AddressShapeWithValidation from '../propTypes/AddressShapeWithValidation'
import geolocationAutoCompleteAddress from './geolocationAutoCompleteAddress'
import { EGOOGLEADDRESS } from '../constants'
import { injectRules } from '../addressRulesContext'
import { injectAddressContext } from '../addressContainerContext'
import { injectIntl } from '../intl/utils'
import PlaceSuggestions, { getOptionId } from './PlaceSuggestions'
import { toLegacyPlaceResult } from './placesAdapter'
import {
  createSessionToken,
  fetchPlace,
  fetchSuggestions,
  searchByText,
} from './newPlacesSource'
import {
  UNSUPPORTED_MAPS_VERSION,
  getPlacesApiNewErrorReason,
  getPlacesApiPreference,
  isPlacesApiNewSupported,
  isPlacesApiNewUnavailableError,
  reportPlacesApiNewError,
} from './placesMode'

export const SUGGESTIONS_DEBOUNCE_MS = 300

// Rendering the input and the suggestions list side by side needs React 16+.
// On React 15 the component always uses the legacy widgets.
const SUPPORTS_ARRAY_RENDER = parseInt(React.version, 10) >= 16

let listboxCounter = 0

class GeolocationInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      address: this.props.address,
      suggestions: [],
      activeIndex: -1,
    }

    listboxCounter += 1
    this.listboxId = `ship-addressQuery-suggestions-${listboxCounter}`
    this.requestId = 0
    this.selectionId = 0
    this.debouncedFetchSuggestions = debounce(
      this.fetchSuggestions,
      SUGGESTIONS_DEBOUNCE_MS
    )

    this.handleMountInput = this.handleMountInput.bind(this)
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      address: nextProps.address,
    })
  }

  componentDidUpdate() {
    this.syncAriaAttributes()
  }

  componentWillUnmount() {
    this.unmounted = true
    this.cancelPendingSuggestions()
  }

  handleMountInput = (input) => {
    if (this.autocompleteListener) {
      this.autocompleteListener.remove()
      this.autocompleteListener = null
    }

    this.detachNewPlaces()

    if (!input) {
      this.input = null
      this.autocomplete = null

      return
    }

    this.input = input
    this.placesMode = this.getPlacesMode()

    if (this.placesMode === 'new') {
      this.attachNewPlaces()
    } else {
      this.attachLegacyWidget()
    }
  }

  // The store preference alone decides which API runs: legacy Places is the
  // default and Places API (New) is opt-in. There is no runtime fallback.
  getPlacesMode = () =>
    SUPPORTS_ARRAY_RENDER && getPlacesApiPreference() === 'new'
      ? 'new'
      : 'legacy'

  attachLegacyWidget = () => {
    const { useSearchBox, rules, googleMaps } = this.props

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

  attachNewPlaces = () => {
    const { googleMaps, rules } = this.props

    if (!isPlacesApiNewSupported(googleMaps)) {
      reportPlacesApiNewError(UNSUPPORTED_MAPS_VERSION, rules.country)
    }

    this.sessionToken = null
    this.input.addEventListener('keydown', this.handleKeyDown)
    this.input.addEventListener('blur', this.handleBlur)
    this.input.setAttribute('role', 'combobox')
    this.input.setAttribute('aria-autocomplete', 'list')
    this.input.setAttribute('aria-controls', this.listboxId)
    this.syncAriaAttributes()
  }

  detachNewPlaces = () => {
    this.cancelPendingSuggestions()
    this.sessionToken = null

    if (this.input && this.placesMode === 'new') {
      this.input.removeEventListener('keydown', this.handleKeyDown)
      this.input.removeEventListener('blur', this.handleBlur)
      ;[
        'role',
        'aria-autocomplete',
        'aria-controls',
        'aria-expanded',
        'aria-activedescendant',
      ].forEach((attribute) => this.input.removeAttribute(attribute))
    }

    this.closeSuggestions()
  }

  syncAriaAttributes = () => {
    if (!this.input || this.placesMode !== 'new') {
      return
    }

    const { suggestions, activeIndex } = this.state

    this.input.setAttribute('aria-expanded', String(suggestions.length > 0))

    if (activeIndex >= 0 && suggestions[activeIndex]) {
      this.input.setAttribute(
        'aria-activedescendant',
        getOptionId(this.listboxId, activeIndex)
      )
    } else {
      this.input.removeAttribute('aria-activedescendant')
    }
  }

  cancelPendingSuggestions = () => {
    this.debouncedFetchSuggestions.cancel()
    // Invalidates responses of requests that are still in flight.
    this.requestId += 1
  }

  closeSuggestions = () => {
    if (this.unmounted) {
      return
    }

    if (this.state.suggestions.length || this.state.activeIndex !== -1) {
      this.setState({ suggestions: [], activeIndex: -1 })
    }
  }

  getSessionToken = () => {
    if (!this.sessionToken) {
      this.sessionToken = createSessionToken(this.props.googleMaps)
    }

    return this.sessionToken
  }

  fetchSuggestions = (value) => {
    const { googleMaps, rules } = this.props

    if (!isPlacesApiNewSupported(googleMaps)) {
      return
    }

    const requestId = this.requestId + 1

    this.requestId = requestId

    fetchSuggestions(googleMaps, {
      input: value,
      sessionToken: this.getSessionToken(),
      regionCode: rules.abbr,
    })
      .then((suggestions) => {
        if (this.isStaleRequest(requestId)) return

        this.setState({ suggestions, activeIndex: -1 })
      })
      .catch((error) => {
        if (this.unmounted) return

        // A key or project that blocks Places API (New) is a store
        // configuration problem: report it, but keep the opted-in API.
        if (isPlacesApiNewUnavailableError(error)) {
          reportPlacesApiNewError(
            getPlacesApiNewErrorReason(error),
            rules.country
          )
        }

        if (requestId === this.requestId) {
          this.closeSuggestions()
        }
      })
  }

  isStaleRequest = (requestId) =>
    this.unmounted || requestId !== this.requestId || this.placesMode !== 'new'

  // Selections have their own counter so that a blur while place details load
  // does not discard the shopper's choice.
  startSelection = () => {
    this.cancelPendingSuggestions()
    this.closeSuggestions()
    // The prediction carries its session token: the next search starts a new
    // session.
    this.sessionToken = null
    this.selectionId += 1

    return this.selectionId
  }

  isStaleSelection = (selectionId) =>
    this.unmounted ||
    selectionId !== this.selectionId ||
    this.placesMode !== 'new'

  handleSelectSuggestion = (item) => {
    const selectionId = this.startSelection()

    fetchPlace(item.prediction)
      .then((place) => {
        if (this.isStaleSelection(selectionId)) return

        this.handleNewPlace(place)
      })
      .catch(() => {})
  }

  searchTypedText = (textQuery) => {
    const { googleMaps, rules } = this.props
    const selectionId = this.startSelection()

    searchByText(googleMaps, { textQuery, regionCode: rules.abbr })
      .then((place) => {
        if (!place || this.isStaleSelection(selectionId)) return

        this.handleNewPlace(place)
      })
      .catch(() => {})
  }

  handleNewPlace = (place) => {
    const googleAddress = toLegacyPlaceResult(place)

    if (googleAddress.geometry) {
      this.handleAddress(googleAddress)
    }
  }

  handleKeyDown = (event) => {
    const { suggestions, activeIndex } = this.state
    const count = suggestions.length

    switch (event.key) {
      case 'ArrowDown':
        if (!count) return
        event.preventDefault()
        this.setState({ activeIndex: (activeIndex + 1) % count })
        break

      case 'ArrowUp':
        if (!count) return
        event.preventDefault()
        this.setState({
          activeIndex: activeIndex <= 0 ? count - 1 : activeIndex - 1,
        })
        break

      case 'Enter':
        this.handleEnter(event)
        break

      case 'Escape':
        if (!count) return
        event.preventDefault()
        this.cancelPendingSuggestions()
        this.closeSuggestions()
        break

      default:
        break
    }
  }

  handleEnter = (event) => {
    const { suggestions, activeIndex } = this.state

    if (activeIndex >= 0 && suggestions[activeIndex]) {
      event.preventDefault()
      this.handleSelectSuggestion(suggestions[activeIndex])

      return
    }

    if (!this.props.useSearchBox) {
      return
    }

    event.preventDefault()

    if (suggestions.length) {
      this.handleSelectSuggestion(suggestions[0])

      return
    }

    const textQuery = (this.input && this.input.value) || ''

    if (textQuery.trim()) {
      this.searchTypedText(textQuery)
    }
  }

  handleBlur = () => {
    this.cancelPendingSuggestions()
    this.closeSuggestions()
  }

  handleInputChange = (value) => {
    this.handleChangeInput(value)

    if (this.placesMode !== 'new' || !this.input) {
      return
    }

    if (!value || !value.trim()) {
      this.cancelPendingSuggestions()
      this.closeSuggestions()

      return
    }

    this.debouncedFetchSuggestions(value)
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

  handleHoverSuggestion = (index) => {
    this.setState({ activeIndex: index })
  }

  renderSuggestions() {
    const { suggestions, activeIndex } = this.state

    if (!suggestions.length || this.placesMode !== 'new' || !this.input) {
      return null
    }

    return (
      <div
        key="suggestions"
        style={{
          position: 'absolute',
          zIndex: 1000,
          width: this.input.offsetWidth || undefined,
        }}
      >
        <PlaceSuggestions
          id={this.listboxId}
          items={suggestions}
          activeIndex={activeIndex}
          onSelect={this.handleSelectSuggestion}
          onHover={this.handleHoverSuggestion}
        />
      </div>
    )
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

    const input = (
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
        onChange={!loadingGoogle ? this.handleInputChange : () => {}}
        inputRef={!loadingGoogle ? this.handleMountInput : undefined}
      />
    )

    // Without the opt-in the rendered tree stays exactly the legacy one.
    if (!SUPPORTS_ARRAY_RENDER || getPlacesApiPreference() !== 'new') {
      return input
    }

    return [input, this.renderSuggestions()]
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

import { Component } from 'react'
import PropTypes from 'prop-types'
import loadGoogleMaps from './googleMaps'

class GoogleMapsContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      googleMaps: null,
      loading: true,
    }
  }

  componentDidMount() {
    const { locale, apiKey } = this.props

    loadGoogleMaps({ locale, apiKey }).then(googleMaps => {
      this.setState({ googleMaps, loading: false })
    })
  }

  render() {
    const { googleMaps, loading } = this.state

    return this.props.children({
      loading,
      googleMaps,
    })
  }
}

GoogleMapsContainer.propTypes = {
  children: PropTypes.func.isRequired,
  apiKey: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
}

export default GoogleMapsContainer

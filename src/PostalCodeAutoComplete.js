import React, { Component } from 'react'
import PropTypes from 'prop-types'

class PostalCodeAutoComplete extends Component {
  render() {
    return <div />
  }
}

PostalCodeAutoComplete.propTypes = {
  postalCode: PropTypes.string,
  country: PropTypes.string.isRequired,
  regex: PropTypes.string,
  onChangePostalCode: PropTypes.func.isRequired,
}

export default PostalCodeAutoComplete

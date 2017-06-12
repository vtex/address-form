import React, { Component } from 'react'
import PropTypes from 'prop-types'

class PostalCodeGetter extends Component {
  render() {
    return <div />
  }
}

PostalCodeGetter.propTypes = {
  postalCode: PropTypes.string,
  country: PropTypes.string.isRequired,
  onChangePostalCode: PropTypes.func.isRequired,
}

export default PostalCodeGetter

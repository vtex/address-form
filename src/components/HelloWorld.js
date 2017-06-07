import React, { Component } from 'react'
import PropTypes from 'prop-types'

class HelloWorld extends Component {
  render() {
    return <h1>Address Form</h1>
  }
}

HelloWorld.propTypes = {
  message: PropTypes.string,
}

export default HelloWorld

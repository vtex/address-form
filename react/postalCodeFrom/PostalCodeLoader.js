import React, { Component } from 'react'

class PostalCodeLoader extends Component {
  render() {
    return (
      <i className="loading-inline icon-spinner icon-spin">
        <span>Loading</span>
      </i>
    )
  }
}

export default PostalCodeLoader

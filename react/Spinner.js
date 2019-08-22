import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Spinner from '@vtex/styleguide/lib/Spinner'

class SpinnerLoading extends Component {
  render() {
    const { isLoading } = this.props

    return (
      isLoading && (
        <div className="pl1 pt7">
          <Spinner size={15} />
        </div>
      )
    )
  }
}

SpinnerLoading.propTypes = {
  isLoading: PropTypes.bool,
}

export default SpinnerLoading

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation from '../propTypes/AddressShapeWithValidation'
import SelectPostalCode from './SelectPostalCode'
import SubmitButton from './SubmitButton'

class OneLevel extends Component {
  handleSubmit = event => {
    event.preventDefault()
    this.props.onSubmit && this.props.onSubmit()
  }

  render() {
    const {
      address,
      Button,
      Input,
      onSubmit,
      onChangeAddress,
      rules,
      submitLabel,
    } = this.props

    if (Button && onSubmit) {
      return (
        <form
          className="vtex-address-form__oneLevel"
          onSubmit={this.handleSubmit}
        >
          <SelectPostalCode
            address={address}
            Input={Input}
            rules={rules}
            onChangeAddress={onChangeAddress}
          />
          <SubmitButton Button={Button} buttonLabel={submitLabel} />
        </form>
      )
    }
    return (
      <div>
        <SelectPostalCode
          address={address}
          Input={Input}
          rules={rules}
          onChangeAddress={onChangeAddress}
        />
      </div>
    )
  }
}

OneLevel.propTypes = {
  address: AddressShapeWithValidation,
  Button: PropTypes.func,
  Input: PropTypes.func.isRequired,
  rules: PropTypes.object.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  submitLabel: PropTypes.string,
}

export default OneLevel

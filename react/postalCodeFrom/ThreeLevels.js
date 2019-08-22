import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation from '../propTypes/AddressShapeWithValidation'
import SelectLevel from './SelectLevel'
import SelectPostalCode from './SelectPostalCode'
import SubmitButton from './SubmitButton'

class ThreeLevels extends Component {
  handleSubmit = event => {
    event.preventDefault()
    this.props.onSubmit && this.props.onSubmit()
  }

  render() {
    const {
      address,
      Button,
      rules,
      Input,
      onChangeAddress,
      onSubmit,
      submitLabel,
    } = this.props

    if (Button && onSubmit) {
      return (
        <form
          className="vtex-address-form__threeLevels"
          onSubmit={this.handleSubmit}
        >
          <SelectLevel
            level={0}
            Input={Input}
            rules={rules}
            address={address}
            onChangeAddress={onChangeAddress}
          />
          <SelectLevel
            level={1}
            Input={Input}
            rules={rules}
            address={address}
            onChangeAddress={onChangeAddress}
          />
          <SelectPostalCode
            Input={Input}
            rules={rules}
            address={address}
            onChangeAddress={onChangeAddress}
          />
          <SubmitButton Button={Button} buttonLabel={submitLabel} />
        </form>
      )
    }

    return (
      <div>
        <SelectLevel
          level={0}
          Input={Input}
          rules={rules}
          address={address}
          onChangeAddress={onChangeAddress}
        />
        <SelectLevel
          level={1}
          Input={Input}
          rules={rules}
          address={address}
          onChangeAddress={onChangeAddress}
        />
        <SelectPostalCode
          Input={Input}
          rules={rules}
          address={address}
          onChangeAddress={onChangeAddress}
        />
      </div>
    )
  }
}

ThreeLevels.propTypes = {
  address: AddressShapeWithValidation,
  Button: PropTypes.func,
  Input: PropTypes.func.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  rules: PropTypes.object.isRequired,
  submitLabel: PropTypes.string,
}

export default ThreeLevels

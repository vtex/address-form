import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation from '../propTypes/AddressShapeWithValidation'
import SelectPostalCode from './SelectPostalCode'
import SubmitButton from './SubmitButton'

class OneLevel extends Component {
  handleSubmit = (event) => {
    event.preventDefault()
    this.props.onSubmit && this.props.onSubmit()
  }

  render() {
    const {
      address,
      Button,
      Input,
      loading,
      onSubmit,
      onChangeAddress,
      omitContainerElement,
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
            loading={loading}
            rules={rules}
            onChangeAddress={onChangeAddress}
          />
          <SubmitButton Button={Button} buttonLabel={submitLabel} />
        </form>
      )
    }

    const content = (
      <SelectPostalCode
        address={address}
        Input={Input}
        loading={loading}
        rules={rules}
        onChangeAddress={onChangeAddress}
      />
    )

    return omitContainerElement ? content : <div>{content}</div>
  }
}

OneLevel.defaultProps = {
  omitContainerElement: false,
}

OneLevel.propTypes = {
  address: AddressShapeWithValidation,
  Button: PropTypes.func,
  loading: PropTypes.bool,
  Input: PropTypes.func.isRequired,
  rules: PropTypes.object.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
  omitContainerElement: PropTypes.bool,
  onSubmit: PropTypes.func,
  submitLabel: PropTypes.string,
}

export default OneLevel

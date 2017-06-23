import { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation
  from '../propTypes/AddressShapeWithValidation'
import {
  getPostalCodeOptions,
  getLevels,
  getCurrentLevelField,
} from '../selectors/postalCode'

class SelectPostalCode extends Component {
  constructor(props) {
    super(props)

    this.state = getLevels(props.rules)
  }

  componentWillReceiveProps(nextProps) {
    this.setState(getLevels(nextProps.rules))
  }

  handleChange = value => {
    const rules = this.props.rules
    const levels = this.state.levels
    const currentLevelName = getCurrentLevelField(levels, rules).name

    this.props.onChangeAddress({
      ...this.deComposeValue(currentLevelName, value[currentLevelName].value),
    })
  };

  composeValue = (currentLevelName, address) =>
    (address[currentLevelName] &&
      address[currentLevelName].value &&
      address.postalCode &&
      address.postalCode.value
      ? `${address[currentLevelName].value}___${address.postalCode.value}`
      : null);

  deComposeValue = (currentLevelName, value) => {
    const [field, postalCode] = value.split('___')
    return {
      [currentLevelName]: { value: field },
      postalCode: { value: postalCode },
    }
  };

  getOptions(fieldName, address, rules) {
    return getPostalCodeOptions(address, rules).map(({
      postalCode,
      label,
    }) => ({
      label,
      value: this.composeValue(fieldName, {
        [fieldName]: { value: label },
        postalCode: { value: postalCode },
      }),
    }))
  }

  render() {
    const { address, rules } = this.props
    const { levels } = this.state
    const currentLevelField = getCurrentLevelField(levels, rules)
    const fieldName = currentLevelField.name

    const newAddress = {
      ...address,
      [fieldName]: {
        ...address[fieldName],
        value: this.composeValue(fieldName, address),
      },
    }

    return this.props.children({
      field: currentLevelField,
      address: newAddress,
      options: this.getOptions(fieldName, address, rules),
      onChangeAddress: this.handleChange,
    })
  }
}

SelectPostalCode.propTypes = {
  children: PropTypes.func.isRequired,
  address: PropTypes.shape(AddressShapeWithValidation).isRequired,
  rules: PropTypes.object.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
}

export default SelectPostalCode

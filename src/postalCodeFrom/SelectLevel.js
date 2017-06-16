import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShape from '../propTypes/AddressShape'
import InputSelect from '../addressInputs/InputSelect'
import InputLabel from '../addressInputs/InputLabel'
import { getField } from '../selectors/fields'

class SelectLevel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      field: this.getLevelField(props),
    }
  }

  getLevelField({ level, rules }) {
    return getField(rules.postalCodeLevels[level], rules)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ field: this.getLevelField(nextProps) })
  }

  render() {
    const { field } = this.state
    const { rules, address, onChangeAddress } = this.props

    return (
      <InputLabel field={field}>
        <InputSelect
          field={field}
          rules={rules}
          address={address}
          onChange={onChangeAddress}
        />
      </InputLabel>
    )
  }
}

SelectLevel.propTypes = {
  level: PropTypes.oneOf([0, 1]),
  address: PropTypes.shape(AddressShape),
  rules: PropTypes.object.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
}

export default SelectLevel

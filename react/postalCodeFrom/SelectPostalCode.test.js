import React, { Component } from 'react'
import { shallow, mount } from 'test-utils'
import SelectPostalCode from './SelectPostalCode'
import useOneLevel from '../country/__mocks__/useOneLevel'
import address from '../__mocks__/newAddress'
import find from 'lodash/find'

describe('SelectPostalCode', () => {
  const firstLevelName = useOneLevel.postalCodeLevels[0]
  const firstLevelField = find(
    useOneLevel.fields,
    field => field.name === firstLevelName
  )

  class MockInput extends Component {
    render() {
      return <span />
    }
  }

  it('should render PureInput with the right props', () => {
    const wrapper = shallow(
      <SelectPostalCode
        Input={MockInput}
        address={address}
        rules={useOneLevel}
        onChangeAddress={jest.fn()}
      />
    )

    const props = wrapper.find('PureInput').props()

    expect(props).toMatchObject({
      address,
      field: firstLevelField,
      options: expect.any(Array),
      onChangeAddress: expect.any(Function),
    })
  })

  it('should render PureInput with options with postal codes', () => {
    const firstLevelOptions = useOneLevel.firstLevelPostalCodes.map(
      ({ label, postalCode }) => ({
        value: `${label}___${postalCode}`,
        label: label,
      })
    )

    const wrapper = shallow(
      <SelectPostalCode
        Input={MockInput}
        address={address}
        rules={useOneLevel}
        onChangeAddress={jest.fn()}
      />
    )

    const props = wrapper.find('PureInput').props()

    expect(props).toMatchObject({
      address,
      field: expect.anything(),
      options: firstLevelOptions,
      onChangeAddress: expect.any(Function),
    })
  })

  it('should render PureInput with address with postal-code-defining-field with postal code appended to its value', () => {
    const wrapper = shallow(
      <SelectPostalCode
        Input={MockInput}
        address={{
          ...address,
          postalCode: { value: '0001' },
          state: { value: 'Bolivar' },
        }}
        rules={useOneLevel}
        onChangeAddress={jest.fn()}
      />
    )

    const props = wrapper.find('PureInput').props()

    expect(props.address.state).toMatchObject({
      value: 'Bolivar___0001',
    })
  })

  it('should handle change leaving postal-code-defining-field clean', () => {
    const Component = jest.fn(({ onChange }) => {
      onChange('Azuay___0000')
      return <div />
    })
    const handleChange = jest.fn()

    mount(
      <SelectPostalCode
        Input={Component}
        address={{
          ...address,
          postalCode: { value: '0001' },
          state: { value: 'Bolivar' },
        }}
        rules={useOneLevel}
        onChangeAddress={handleChange}
      />
    )

    expect(handleChange).toHaveBeenCalledWith({
      postalCode: { value: '0000' },
      state: { value: 'Azuay' },
    })
  })
})

import React from 'react'
import SelectLevel from './SelectLevel'
import { shallow, mount } from 'enzyme'
import useThreeLevels from '../country/__mocks__/useThreeLevels'
import address from '../__mocks__/newAddress'
import INPUT_EXTRA_PROPS from '../__mocks__/inputExtraProps'
import MockInput from '../DefaultInput/__mocks__/Input'

describe('SelectLevel', () => {
  it('render it right', () => {
    const wrapper = shallow(
      <SelectLevel
        level={0}
        Input={MockInput}
        address={address}
        rules={useThreeLevels}
        onChangeAddress={jest.fn()}
      />,
    )

    expect(wrapper.find('InputFieldContainer')).toHaveLength(1)
  })

  it('render it right with inputExtraProps', () => {
    const wrapper = shallow(
      <SelectLevel
        level={0}
        Input={MockInput}
        address={address}
        rules={useThreeLevels}
        onChangeAddress={jest.fn()}
        inputExtraProps={INPUT_EXTRA_PROPS}
      />,
    )

    expect(wrapper.find('InputFieldContainer').prop('inputExtraProps')).toEqual(
      INPUT_EXTRA_PROPS,
    )
  })

  it('should call handleChange', () => {
    const Component = jest.fn(({ onChange }) => {
      onChange('Beni')
      return <div />
    })
    const handleChange = jest.fn()

    mount(
      <SelectLevel
        level={0}
        Input={Component}
        address={address}
        rules={useThreeLevels}
        onChangeAddress={handleChange}
      />,
    )

    expect(handleChange).toHaveBeenCalled()
  })

  it('should call handleChange and clear dependent fields', () => {
    const Component = jest.fn(({ onChange }) => {
      onChange('II Región')
      return <div />
    })
    const handleChange = jest.fn()

    mount(
      <SelectLevel
        level={0}
        Input={Component}
        address={{
          ...address,
          state: { value: 'I Región ' },
          city: { value: 'Calama' },
          postalCode: { value: '1390000' },
        }}
        rules={useThreeLevels}
        onChangeAddress={handleChange}
      />,
    )

    expect(handleChange).toHaveBeenCalledWith({
      state: {
        value: 'II Región',
        geolocationAutoCompleted: undefined,
        postalCodeAutoCompleted: undefined,
      },
      city: { value: null },
      neighborhood: { value: null },
      postalCode: { value: null },
    })
  })
})

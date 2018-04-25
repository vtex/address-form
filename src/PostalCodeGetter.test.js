import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import PostalCodeGetter from './PostalCodeGetter'
import address from './__mocks__/newAddress'
import INPUT_EXTRA_PROPS from './__mocks__/inputExtraProps'
import usePostalCode from './country/__mocks__/usePostalCode'
import useOneLevel from './country/__mocks__/useOneLevel'
import useTwoLevels from './country/__mocks__/useTwoLevels'
import useThreeLevels from './country/__mocks__/useThreeLevels'

describe('PostalCodeGetter', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')

    ReactDOM.render(
      <PostalCodeGetter
        address={address}
        rules={usePostalCode}
        onChangeAddress={jest.fn()}
      />,
      div,
    )
  })

  it('render PostalCode', () => {
    const handleChange = jest.fn()

    const wrapper = shallow(
      <PostalCodeGetter
        address={address}
        rules={usePostalCode}
        onChangeAddress={handleChange}
      />,
    )

    expect(wrapper.find('InputFieldContainer')).toHaveLength(1)
  })

  it('render PostalCode and check for inputExtraProps', () => {
    const handleChange = jest.fn()

    const wrapper = shallow(
      <PostalCodeGetter
        address={address}
        rules={usePostalCode}
        onChangeAddress={handleChange}
        inputExtraProps={INPUT_EXTRA_PROPS}
      />,
    )

    expect(wrapper.find('InputFieldContainer').prop('inputExtraProps')).toEqual(
      INPUT_EXTRA_PROPS,
    )
  })

  it('render OneLevel', () => {
    const handleChange = jest.fn()

    const wrapper = shallow(
      <PostalCodeGetter
        address={address}
        rules={useOneLevel}
        onChangeAddress={handleChange}
      />,
    )

    expect(wrapper.find('OneLevel')).toHaveLength(1)
  })

  it('render OneLevel and check for inputExtraProps', () => {
    const handleChange = jest.fn()

    const wrapper = shallow(
      <PostalCodeGetter
        address={address}
        rules={useOneLevel}
        onChangeAddress={handleChange}
        inputExtraProps={INPUT_EXTRA_PROPS}
      />,
    )

    expect(wrapper.find('OneLevel').prop('inputExtraProps')).toEqual(
      INPUT_EXTRA_PROPS,
    )
  })

  it('render TwoLevels', () => {
    const handleChange = jest.fn()

    const wrapper = shallow(
      <PostalCodeGetter
        address={address}
        rules={useTwoLevels}
        onChangeAddress={handleChange}
      />,
    )

    expect(wrapper.find('TwoLevels')).toHaveLength(1)
  })

  it('render TwoLevels and check for inputExtraProps', () => {
    const handleChange = jest.fn()

    const wrapper = shallow(
      <PostalCodeGetter
        address={address}
        rules={useTwoLevels}
        onChangeAddress={handleChange}
        inputExtraProps={INPUT_EXTRA_PROPS}
      />,
    )

    expect(wrapper.find('TwoLevels').prop('inputExtraProps')).toEqual(
      INPUT_EXTRA_PROPS,
    )
  })

  it('render ThreeLevels', () => {
    const handleChange = jest.fn()

    const wrapper = shallow(
      <PostalCodeGetter
        address={address}
        rules={useThreeLevels}
        onChangeAddress={handleChange}
      />,
    )

    expect(wrapper.find('ThreeLevels')).toHaveLength(1)
  })

  it('render ThreeLevels and check for inputExtraProps', () => {
    const handleChange = jest.fn()

    const wrapper = shallow(
      <PostalCodeGetter
        address={address}
        rules={useThreeLevels}
        onChangeAddress={handleChange}
        inputExtraProps={INPUT_EXTRA_PROPS}
      />,
    )

    expect(wrapper.find('ThreeLevels').prop('inputExtraProps')).toEqual(
      INPUT_EXTRA_PROPS,
    )
  })
})

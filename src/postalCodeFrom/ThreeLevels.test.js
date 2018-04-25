import React from 'react'
import { shallow } from 'enzyme'
import ThreeLevels from './ThreeLevels'
import useThreeLevels from '../country/__mocks__/useThreeLevels'
import address from '../__mocks__/newAddress'
import INPUT_EXTRA_PROPS from '../__mocks__/inputExtraProps'
import MockInput from '../DefaultInput/__mocks__/Input'

describe('ThreeLevels', () => {
  it('without first and second level selected', () => {
    const wrapper = shallow(
      <ThreeLevels
        Input={MockInput}
        address={address}
        rules={useThreeLevels}
        onChangeAddress={jest.fn()}
      />
    )

    expect(wrapper.find('SelectLevel')).toHaveLength(2)
    expect(wrapper.find('SelectPostalCode')).toHaveLength(1)
  })

  it('without first and second level selected and with inputExtraProps', () => {
    const wrapper = shallow(
      <ThreeLevels
        Input={MockInput}
        address={address}
        rules={useThreeLevels}
        onChangeAddress={jest.fn()}
        inputExtraProps={INPUT_EXTRA_PROPS}
      />
    )

    expect(wrapper.find('SelectLevel').first().prop('inputExtraProps')).toEqual(
      INPUT_EXTRA_PROPS,
    )
    expect(wrapper.find('SelectLevel').last().prop('inputExtraProps')).toEqual(
      INPUT_EXTRA_PROPS,
    )
    expect(wrapper.find('SelectPostalCode').prop('inputExtraProps')).toEqual(
      INPUT_EXTRA_PROPS,
    )
  })
})

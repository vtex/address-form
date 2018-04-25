import React from 'react'
import { shallow } from 'enzyme'
import TwoLevels from './TwoLevels'
import useTwoLevels from '../country/__mocks__/useTwoLevels'
import address from '../__mocks__/newAddress'
import INPUT_EXTRA_PROPS from '../__mocks__/inputExtraProps'
import MockInput from '../DefaultInput/__mocks__/Input'

describe('TwoLevels', () => {
  it('render it right', () => {
    const wrapper = shallow(
      <TwoLevels
        Input={MockInput}
        address={address}
        rules={useTwoLevels}
        onChangeAddress={jest.fn()}
      />,
    )

    expect(wrapper.find('SelectLevel')).toHaveLength(1)
    expect(wrapper.find('SelectPostalCode')).toHaveLength(1)
  })

  it('render it right with inputExtraProps', () => {
    const wrapper = shallow(
      <TwoLevels
        Input={MockInput}
        address={address}
        rules={useTwoLevels}
        onChangeAddress={jest.fn()}
        inputExtraProps={INPUT_EXTRA_PROPS}
      />,
    )

    expect(wrapper.find('SelectLevel').prop('inputExtraProps')).toEqual(
      INPUT_EXTRA_PROPS,
    )
    expect(wrapper.find('SelectPostalCode').prop('inputExtraProps')).toEqual(
      INPUT_EXTRA_PROPS,
    )
  })
})

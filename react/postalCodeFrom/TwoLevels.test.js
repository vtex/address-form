import React from 'react'
import { shallow } from 'test-utils'
import TwoLevels from './TwoLevels'
import useTwoLevels from '../country/__mocks__/useTwoLevels'
import address from '../__mocks__/newAddress'
import MockInput from '../inputs/DefaultInput/__mocks__/Input'

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
})

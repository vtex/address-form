import React from 'react'
import { shallow } from 'enzyme'
import ThreeLevels from './ThreeLevels'
import useThreeLevels from '../country/__mocks__/useThreeLevels'
import address from '../__mocks__/newAddress'
import MockInput from '../inputs/DefaultInput/__mocks__/Input'

describe('ThreeLevels', () => {
  it('without first and second level selected', () => {
    const wrapper = shallow(
      <ThreeLevels
        Input={MockInput}
        address={address}
        rules={useThreeLevels}
        onChangeAddress={jest.fn()}
      />,
    )

    expect(wrapper.find('SelectLevel')).toHaveLength(2)
    expect(wrapper.find('SelectPostalCode')).toHaveLength(1)
  })
})

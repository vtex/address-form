import React from 'react'
import { shallow } from 'test-utils'
import OneLevel from './OneLevel'
import useOneLevel from '../country/__mocks__/useOneLevel'
import address from '../__mocks__/newAddress'
import MockInput from '../inputs/DefaultInput/__mocks__/Input'

describe('OneLevel', () => {
  it('render it right', () => {
    const wrapper = shallow(
      <OneLevel
        Input={MockInput}
        address={address}
        rules={useOneLevel}
        onChangeAddress={jest.fn()}
      />,
    )

    expect(wrapper.find('SelectPostalCode')).toHaveLength(1)
  })
})

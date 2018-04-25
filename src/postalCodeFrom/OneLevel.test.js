import React from 'react'
import { shallow } from 'enzyme'
import OneLevel from './OneLevel'
import useOneLevel from '../country/__mocks__/useOneLevel'
import address from '../__mocks__/newAddress'
import INPUT_EXTRA_PROPS from '../__mocks__/inputExtraProps'
import MockInput from '../DefaultInput/__mocks__/Input'

describe('OneLevel', () => {
  it('render it right', () => {
    const wrapper = shallow(
      <OneLevel
        Input={MockInput}
        address={address}
        rules={useOneLevel}
        onChangeAddress={jest.fn()}
      />
    )

    expect(wrapper.find('SelectPostalCode')).toHaveLength(1)
  })

  it('render it right with inputExtraProps', () => {
    const wrapper = shallow(
      <OneLevel
        Input={MockInput}
        address={address}
        rules={useOneLevel}
        onChangeAddress={jest.fn()}
        inputExtraProps={INPUT_EXTRA_PROPS}
      />
    )

    expect(wrapper.find('SelectPostalCode')).toHaveLength(1)
  })
})

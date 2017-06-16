import React from 'react'
import renderer from 'react-test-renderer'
import OneLevel from './OneLevel'
import { shallow } from 'enzyme'
import useOneLevel from '../country/__mocks__/useOneLevel'
import address from '../__mocks__/newAddress'

describe('OneLevel', () => {
  it('show state options', () => {
    const tree = renderer
      .create(
        <OneLevel
          address={address}
          rules={useOneLevel}
          onChangeAddress={jest.fn()}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should change the postal code and the state', () => {
    const handleChange = jest.fn()
    const wrapper = shallow(
      <OneLevel
        address={address}
        rules={useOneLevel}
        onChangeAddress={handleChange}
      />
    )

    const event = { target: { value: 'Azuay___0000' } }
    wrapper.find('select').simulate('change', event)

    expect(handleChange).toHaveBeenCalledWith({
      ...address,
      postalCode: '0000',
      state: 'Azuay',
    })
  })
})

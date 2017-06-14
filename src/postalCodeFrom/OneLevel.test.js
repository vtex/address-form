import React from 'react'
import renderer from 'react-test-renderer'
import OneLevel from './OneLevel'
import { shallow } from 'enzyme'
import ECU from '../country/ECU'
import newAddress from '../__mocks__/newAddress'

describe('OneLevel', () => {
  it('show state options', () => {
    const address = {
      ...newAddress,
      country: 'ECU',
    }

    const tree = renderer
      .create(
        <OneLevel address={address} rules={ECU} onChangeAddress={jest.fn()} />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should change the postal code and the state', () => {
    const handleChange = jest.fn()
    const wrapper = shallow(
      <OneLevel
        address={{
          ...newAddress,
          country: 'ECU',
        }}
        rules={ECU}
        onChangeAddress={handleChange}
      />
    )

    const event = { target: { value: 'Azuay___0000' } }
    wrapper.find('select').simulate('change', event)

    expect(handleChange).toHaveBeenCalledWith({
      ...newAddress,
      country: 'ECU',
      postalCode: '0000',
      state: 'Azuay',
    })
  })
})

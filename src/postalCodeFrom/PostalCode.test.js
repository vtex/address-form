import React from 'react'
import renderer from 'react-test-renderer'
import PostalCode from './PostalCode'
import { shallow } from 'enzyme'
import BRA from '../country/BRA'
import newAddress from '../__mocks__/newAddress'

describe('Postal Code', () => {
  it('show postal code', () => {
    const address = {
      ...newAddress,
      country: 'BRA',
    }

    const tree = renderer
      .create(
        <PostalCode address={address} rules={BRA} onChangeAddress={jest.fn()} />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should change the postal code', () => {
    const handleChange = jest.fn()
    const wrapper = shallow(
      <PostalCode
        address={{
          ...newAddress,
          country: 'BRA',
          postalCode: '',
        }}
        rules={BRA}
        onChangeAddress={handleChange}
      />
    )

    const event = { target: { value: '2' } }
    wrapper.find('input').simulate('change', event)

    expect(handleChange).toHaveBeenCalledWith({
      ...newAddress,
      country: 'BRA',
      postalCode: '2',
    })
  })
})

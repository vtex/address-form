import React from 'react'
import renderer from 'react-test-renderer'
import PostalCode from './PostalCode'
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
})

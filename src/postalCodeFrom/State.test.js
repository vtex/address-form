import React from 'react'
import renderer from 'react-test-renderer'
import State from './State'
import ECU from '../country/ECU'
import newAddress from '../__mocks__/newAddress'

describe('State', () => {
  it('show state options', () => {
    const address = {
      ...newAddress,
      country: 'ECU',
    }

    const tree = renderer
      .create(
        <State address={address} rules={ECU} onChangeAddress={jest.fn()} />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})

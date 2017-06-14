import React from 'react'
import renderer from 'react-test-renderer'
import City from './City'
import CHL from '../country/CHL'
import newAddress from '../__mocks__/newAddress'

describe('City', () => {
  it('without state selected', () => {
    const address = {
      ...newAddress,
      country: 'CHL',
    }

    const tree = renderer
      .create(
        <City address={address} rules={CHL} onChangeAddress={jest.fn()} />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('with state selected', () => {
    const address = {
      ...newAddress,
      country: 'CHL',
      state: 'XV Región',
    }

    const tree = renderer
      .create(
        <City address={address} rules={CHL} onChangeAddress={jest.fn()} />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})

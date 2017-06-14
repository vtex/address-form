import React from 'react'
import renderer from 'react-test-renderer'
import Neighborhood from './Neighborhood'
import BOL from '../country/BOL'
import newAddress from '../__mocks__/newAddress'

describe('Neighborhood', () => {
  it('without state and city selected', () => {
    const address = {
      ...newAddress,
      country: 'BOL',
    }

    const tree = renderer
      .create(
        <Neighborhood
          address={address}
          rules={BOL}
          onChangeAddress={jest.fn()}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('with state selected and city not selected', () => {
    const address = {
      ...newAddress,
      country: 'BOL',
      state: 'Tarija',
    }

    const tree = renderer
      .create(
        <Neighborhood
          address={address}
          rules={BOL}
          onChangeAddress={jest.fn()}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('with state and city selected', () => {
    const address = {
      ...newAddress,
      country: 'BOL',
      state: 'Tarija',
      city: 'Méndez',
    }

    const tree = renderer
      .create(
        <Neighborhood
          address={address}
          rules={BOL}
          onChangeAddress={jest.fn()}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('with state, city and neighborhood selected and not postal code', () => {
    const address = {
      ...newAddress,
      country: 'BOL',
      state: 'Tarija',
      city: 'Méndez',
      neighborhood: 'Canasmoro',
    }

    const tree = renderer
      .create(
        <Neighborhood
          address={address}
          rules={BOL}
          onChangeAddress={jest.fn()}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('with state, city, neighborhood and postalCode selected', () => {
    const address = {
      ...newAddress,
      country: 'BOL',
      state: 'Tarija',
      city: 'Méndez',
      neighborhood: 'Canasmoro',
      postalCode: '90400',
    }

    const tree = renderer
      .create(
        <Neighborhood
          address={address}
          rules={BOL}
          onChangeAddress={jest.fn()}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})

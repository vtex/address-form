import React from 'react'
import renderer from 'react-test-renderer'
import Neighborhood from './Neighborhood'
import { shallow } from 'enzyme'
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

  it('should change the state', () => {
    const handleChange = jest.fn()
    const wrapper = shallow(
      <Neighborhood
        address={{
          ...newAddress,
          country: 'BOL',
        }}
        rules={BOL}
        onChangeAddress={handleChange}
      />
    )

    const event = { target: { value: 'Tarija' } }
    wrapper.find('select[name="state"]').simulate('change', event)

    expect(handleChange).toHaveBeenCalledWith({
      ...newAddress,
      country: 'BOL',
      state: 'Tarija',
    })
  })

  it('should change the city', () => {
    const handleChange = jest.fn()
    const wrapper = shallow(
      <Neighborhood
        address={{
          ...newAddress,
          country: 'BOL',
          state: 'Tarija',
        }}
        rules={BOL}
        onChangeAddress={handleChange}
      />
    )

    const event = { target: { value: 'Méndez' } }
    wrapper.find('select[name="city"]').simulate('change', event)

    expect(handleChange).toHaveBeenCalledWith({
      ...newAddress,
      country: 'BOL',
      state: 'Tarija',
      city: 'Méndez',
    })
  })

  it('should change the neighborhood and postal code ', () => {
    const handleChange = jest.fn()
    const wrapper = shallow(
      <Neighborhood
        address={{
          ...newAddress,
          country: 'BOL',
          state: 'Tarija',
          city: 'Méndez',
        }}
        rules={BOL}
        onChangeAddress={handleChange}
      />
    )

    const event = { target: { value: 'Canasmoro___90400' } }
    wrapper.find('select[name="neighborhood"]').simulate('change', event)

    expect(handleChange).toHaveBeenCalledWith({
      ...newAddress,
      country: 'BOL',
      state: 'Tarija',
      city: 'Méndez',
      neighborhood: 'Canasmoro',
      postalCode: '90400',
    })
  })
})

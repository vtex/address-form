import React from 'react'
import renderer from 'react-test-renderer'
import ThreeLevels from './ThreeLevels'
import { shallow } from 'enzyme'
import BOL from '../country/BOL'
import newAddress from '../__mocks__/newAddress'

describe('ThreeLevels', () => {
  it('without first and second level selected', () => {
    const address = {
      ...newAddress,
      country: 'BOL',
    }

    const tree = renderer
      .create(
        <ThreeLevels
          address={address}
          rules={BOL}
          onChangeAddress={jest.fn()}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('with first level selected and second level not selected', () => {
    const address = {
      ...newAddress,
      country: 'BOL',
      state: 'Tarija',
    }

    const tree = renderer
      .create(
        <ThreeLevels
          address={address}
          rules={BOL}
          onChangeAddress={jest.fn()}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('with first and second level selected', () => {
    const address = {
      ...newAddress,
      country: 'BOL',
      state: 'Tarija',
      city: 'Méndez',
    }

    const tree = renderer
      .create(
        <ThreeLevels
          address={address}
          rules={BOL}
          onChangeAddress={jest.fn()}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('with first, second and third level selected and not postal code', () => {
    const address = {
      ...newAddress,
      country: 'BOL',
      state: 'Tarija',
      city: 'Méndez',
      neighborhood: 'Canasmoro',
    }

    const tree = renderer
      .create(
        <ThreeLevels
          address={address}
          rules={BOL}
          onChangeAddress={jest.fn()}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('with first, second and third level and postalCode selected', () => {
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
        <ThreeLevels
          address={address}
          rules={BOL}
          onChangeAddress={jest.fn()}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should change the first level', () => {
    const handleChange = jest.fn()
    const wrapper = shallow(
      <ThreeLevels
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

  it('should change the second level', () => {
    const handleChange = jest.fn()
    const wrapper = shallow(
      <ThreeLevels
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

  it('should change the third level and postal code ', () => {
    const handleChange = jest.fn()
    const wrapper = shallow(
      <ThreeLevels
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

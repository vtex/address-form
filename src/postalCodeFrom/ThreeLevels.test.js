import React from 'react'
import renderer from 'react-test-renderer'
import ThreeLevels from './ThreeLevels'
import { shallow } from 'enzyme'
import useThreeLevels from '../country/__mocks__/useThreeLevels'
import address from '../__mocks__/newAddress'

describe('ThreeLevels', () => {
  it('without first and second level selected', () => {
    const tree = renderer
      .create(
        <ThreeLevels
          address={address}
          rules={useThreeLevels}
          onChangeAddress={jest.fn()}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('with first level selected and second level not selected', () => {
    const tree = renderer
      .create(
        <ThreeLevels
          address={{
            ...address,
            state: 'Tarija',
          }}
          rules={useThreeLevels}
          onChangeAddress={jest.fn()}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('with first and second level selected', () => {
    const tree = renderer
      .create(
        <ThreeLevels
          address={{
            ...address,
            state: 'Tarija',
            city: 'Méndez',
          }}
          rules={useThreeLevels}
          onChangeAddress={jest.fn()}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('with first, second and third level selected and not postal code', () => {
    const tree = renderer
      .create(
        <ThreeLevels
          address={{
            ...address,
            state: 'Tarija',
            city: 'Méndez',
            neighborhood: 'Canasmoro',
          }}
          rules={useThreeLevels}
          onChangeAddress={jest.fn()}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('with first, second and third level and postalCode selected', () => {
    const tree = renderer
      .create(
        <ThreeLevels
          address={{
            ...address,
            state: 'Tarija',
            city: 'Méndez',
            neighborhood: 'Canasmoro',
            postalCode: '90400',
          }}
          rules={useThreeLevels}
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
        address={address}
        rules={useThreeLevels}
        onChangeAddress={handleChange}
      />
    )

    const event = { target: { value: 'Tarija' } }
    wrapper.find('select[name="state"]').simulate('change', event)

    expect(handleChange).toHaveBeenCalledWith({
      ...address,
      state: 'Tarija',
    })
  })

  it('should change the second level', () => {
    const handleChange = jest.fn()
    const wrapper = shallow(
      <ThreeLevels
        address={{
          ...address,
          state: 'Tarija',
        }}
        rules={useThreeLevels}
        onChangeAddress={handleChange}
      />
    )

    const event = { target: { value: 'Méndez' } }
    wrapper.find('select[name="city"]').simulate('change', event)

    expect(handleChange).toHaveBeenCalledWith({
      ...address,
      state: 'Tarija',
      city: 'Méndez',
    })
  })

  it('should change the third level and postal code ', () => {
    const handleChange = jest.fn()
    const wrapper = shallow(
      <ThreeLevels
        address={{
          ...address,
          state: 'Tarija',
          city: 'Méndez',
        }}
        rules={useThreeLevels}
        onChangeAddress={handleChange}
      />
    )

    const event = { target: { value: 'Canasmoro___90400' } }
    wrapper.find('select[name="neighborhood"]').simulate('change', event)

    expect(handleChange).toHaveBeenCalledWith({
      ...address,
      state: 'Tarija',
      city: 'Méndez',
      neighborhood: 'Canasmoro',
      postalCode: '90400',
    })
  })
})

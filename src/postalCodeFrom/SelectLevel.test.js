import React from 'react'
import renderer from 'react-test-renderer'
import SelectLevel from './SelectLevel'
import { mount } from 'enzyme'
import useTwoLevels from '../country/__mocks__/useTwoLevels'
import useThreeLevels from '../country/__mocks__/useThreeLevels'
import address from '../__mocks__/newAddress'

describe('SelectLevel', () => {
  it('show state options', () => {
    const tree = renderer
      .create(
        <SelectLevel
          level={0}
          address={address}
          rules={useThreeLevels}
          onChangeAddress={jest.fn()}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('show city options', () => {
    const tree = renderer
      .create(
        <SelectLevel
          level={1}
          address={address}
          rules={useThreeLevels}
          onChangeAddress={jest.fn()}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should clear dependent fields when parent field changes', () => {
    const handleChange = jest.fn()
    const wrapper = mount(
      <SelectLevel
        level={0}
        address={{
          ...address,
          state: 'II Región',
          neighborhood: 'Antofagasta',
        }}
        rules={useTwoLevels}
        onChangeAddress={handleChange}
      />
    )

    const event = { target: { value: 'I Región' } }
    wrapper.find('select[name="state"]').simulate('change', event)

    expect(handleChange).toHaveBeenCalledWith({
      ...address,
      state: 'I Región',
      city: null,
    })
  })

  it('should clear dependent fields when parent field changes', () => {
    const handleChange = jest.fn()
    const wrapper = mount(
      <SelectLevel
        level={0}
        address={{
          ...address,
          state: 'Beni',
          city: 'Cercado',
          neighborhood: 'Yucumo',
        }}
        rules={useThreeLevels}
        onChangeAddress={handleChange}
      />
    )

    const event = { target: { value: 'Cochabamba' } }
    wrapper.find('select[name="state"]').simulate('change', event)

    expect(handleChange).toHaveBeenCalledWith({
      ...address,
      state: 'Cochabamba',
      city: null,
      neighborhood: null,
    })
  })
})

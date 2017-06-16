import React from 'react'
import renderer from 'react-test-renderer'
import TwoLevels from './TwoLevels'
import { shallow } from 'enzyme'
import useTwoLevels from '../country/__mocks__/useTwoLevels'
import address from '../__mocks__/newAddress'

describe('City', () => {
  it('without first level selected', () => {
    const tree = renderer
      .create(
        <TwoLevels
          address={address}
          rules={useTwoLevels}
          onChangeAddress={jest.fn()}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('with first level selected', () => {
    const tree = renderer
      .create(
        <TwoLevels
          address={{
            ...address,
            state: 'I Región',
          }}
          rules={useTwoLevels}
          onChangeAddress={jest.fn()}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should change the first level', () => {
    const handleChange = jest.fn()
    const wrapper = shallow(
      <TwoLevels
        address={address}
        rules={useTwoLevels}
        onChangeAddress={handleChange}
      />
    )

    const event = { target: { value: 'I Región' } }
    wrapper.find('select[name="state"]').simulate('change', event)

    expect(handleChange).toHaveBeenCalledWith({
      ...address,
      state: 'I Región',
    })
  })

  it('should change the second level and postal code ', () => {
    const handleChange = jest.fn()
    const wrapper = shallow(
      <TwoLevels
        address={{
          ...address,
          state: 'I Región',
        }}
        rules={useTwoLevels}
        onChangeAddress={handleChange}
      />
    )

    const event = { target: { value: 'Camiña___1150000' } }
    wrapper.find('select[name="neighborhood"]').simulate('change', event)

    expect(handleChange).toHaveBeenCalledWith({
      ...address,
      state: 'I Región',
      neighborhood: 'Camiña',
      postalCode: '1150000',
    })
  })
})

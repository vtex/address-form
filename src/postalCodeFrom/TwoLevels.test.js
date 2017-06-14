import React from 'react'
import renderer from 'react-test-renderer'
import TwoLevels from './TwoLevels'
import { shallow } from 'enzyme'
import CHL from '../country/CHL'
import newAddress from '../__mocks__/newAddress'

describe('City', () => {
  it('without first level selected', () => {
    const address = {
      ...newAddress,
      country: 'CHL',
    }

    const tree = renderer
      .create(
        <TwoLevels address={address} rules={CHL} onChangeAddress={jest.fn()} />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('with first level selected', () => {
    const address = {
      ...newAddress,
      country: 'CHL',
      state: 'XV Región',
    }

    const tree = renderer
      .create(
        <TwoLevels address={address} rules={CHL} onChangeAddress={jest.fn()} />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should change the first level', () => {
    const handleChange = jest.fn()
    const wrapper = shallow(
      <TwoLevels
        address={{
          ...newAddress,
          country: 'CHL',
        }}
        rules={CHL}
        onChangeAddress={handleChange}
      />
    )

    const event = { target: { value: 'XV Región' } }
    wrapper.find('select[name="state"]').simulate('change', event)

    expect(handleChange).toHaveBeenCalledWith({
      ...newAddress,
      country: 'CHL',
      state: 'XV Región',
    })
  })

  it('should change the second level and postal code ', () => {
    const handleChange = jest.fn()
    const wrapper = shallow(
      <TwoLevels
        address={{
          ...newAddress,
          country: 'CHL',
          state: 'XV Región',
        }}
        rules={CHL}
        onChangeAddress={handleChange}
      />
    )

    const event = { target: { value: 'Arica___1000000' } }
    wrapper.find('select[name="neighborhood"]').simulate('change', event)

    expect(handleChange).toHaveBeenCalledWith({
      ...newAddress,
      country: 'CHL',
      state: 'XV Región',
      neighborhood: 'Arica',
      postalCode: '1000000',
    })
  })
})

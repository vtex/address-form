import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import PostalCodeGetter from './PostalCodeGetter'
import { POSTAL_CODE, ONE_LEVEL, TWO_LEVELS, THREE_LEVELS } from './constants'
import address from './__mocks__/newAddress'

describe('PostalCodeGetter', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')

    ReactDOM.render(
      <PostalCodeGetter
        address={address}
        rules={{}}
        onChangeAddress={jest.fn()}
      />,
      div
    )
  })

  it('render PostalCode', () => {
    const handleChange = jest.fn()

    const wrapper = shallow(
      <PostalCodeGetter
        address={address}
        rules={{
          postalCodeFrom: POSTAL_CODE,
        }}
        onChangeAddress={handleChange}
      />
    )

    expect(wrapper.find('PostalCode')).toHaveLength(1)
  })

  it('render State', () => {
    const handleChange = jest.fn()

    const wrapper = shallow(
      <PostalCodeGetter
        address={address}
        rules={{
          postalCodeFrom: ONE_LEVEL,
        }}
        onChangeAddress={handleChange}
      />
    )

    expect(wrapper.find('OneLevel')).toHaveLength(1)
  })

  it('render City', () => {
    const handleChange = jest.fn()

    const wrapper = shallow(
      <PostalCodeGetter
        address={address}
        rules={{
          postalCodeFrom: TWO_LEVELS,
        }}
        onChangeAddress={handleChange}
      />
    )

    expect(wrapper.find('TwoLevels')).toHaveLength(1)
  })

  it('render Neighborhood', () => {
    const handleChange = jest.fn()

    const wrapper = shallow(
      <PostalCodeGetter
        address={address}
        rules={{
          postalCodeFrom: THREE_LEVELS,
        }}
        onChangeAddress={handleChange}
      />
    )

    expect(wrapper.find('ThreeLevels')).toHaveLength(1)
  })
})

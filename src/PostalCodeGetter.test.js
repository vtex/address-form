import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import PostalCodeGetter from './PostalCodeGetter'
import { POSTAL_CODE, STATE, CITY, NEIGHBORHOOD } from './constants'
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
          postalCodeFrom: STATE,
        }}
        onChangeAddress={handleChange}
      />
    )

    expect(wrapper.find('State')).toHaveLength(1)
  })

  it('render City', () => {
    const handleChange = jest.fn()

    const wrapper = shallow(
      <PostalCodeGetter
        address={address}
        rules={{
          postalCodeFrom: CITY,
        }}
        onChangeAddress={handleChange}
      />
    )

    expect(wrapper.find('City')).toHaveLength(1)
  })

  it('render Neighborhood', () => {
    const handleChange = jest.fn()

    const wrapper = shallow(
      <PostalCodeGetter
        address={address}
        rules={{
          postalCodeFrom: NEIGHBORHOOD,
        }}
        onChangeAddress={handleChange}
      />
    )

    expect(wrapper.find('Neighborhood')).toHaveLength(1)
  })
})

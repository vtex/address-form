import React from 'react'
import { shallow } from 'enzyme'
import CountrySelector from './CountrySelector'

it('renders without crashing', () => {
  const wrapper = shallow(
    <CountrySelector shipsTo={['BRA']} onChangeSelectedCountry={jest.fn()} />
  )
  const div = <div />
  expect(wrapper.contains(div)).toEqual(true)
})

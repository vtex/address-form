import React from 'react'
import { shallow } from 'enzyme'
import GeolocationInput from './GeolocationInput'

it('renders without crashing', () => {
  const wrapper = shallow(
    <GeolocationInput country={'BRA'} onChange={jest.fn()} />
  )
  const div = <div />
  expect(wrapper.contains(div)).toEqual(true)
})

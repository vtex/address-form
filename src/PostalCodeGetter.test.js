import React from 'react'
import { shallow } from 'enzyme'
import PostalCodeGetter from './PostalCodeGetter'

it('renders without crashing', () => {
  const wrapper = shallow(
    <PostalCodeGetter
      country={'BRA'}
      postalCode={''}
      onChangePostalCode={jest.fn()}
    />
  )
  const div = <div />
  expect(wrapper.contains(div)).toEqual(true)
})

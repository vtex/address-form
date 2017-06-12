import React from 'react'
import { shallow } from 'enzyme'
import PostalCodeAutoComplete from './PostalCodeAutoComplete'

it('renders without crashing', () => {
  const wrapper = shallow(
    <PostalCodeAutoComplete
      postalCode={''}
      country={'BRA'}
      regex={''}
      onChangePostalCode={jest.fn()}
    />
  )
  const div = <div />
  expect(wrapper.contains(div)).toEqual(true)
})

import React from 'react'
import { shallow } from 'enzyme'
import AddressSummary from './AddressSummary'
import address from './__mocks__/newAddress'

it('renders without crashing', () => {
  const wrapper = shallow(<AddressSummary address={address} />)
  const div = <div />
  expect(wrapper.contains(div)).toEqual(true)
})

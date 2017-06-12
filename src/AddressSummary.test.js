import React from 'react'
import { shallow } from 'enzyme'
import AddressSummary from './AddressSummary'

it('renders without crashing', () => {
  const address = {
    addressId: '1',
    addressType: 'residential',
    country: 'BRA',
  }

  const wrapper = shallow(<AddressSummary address={address} />)
  const div = <div />
  expect(wrapper.contains(div)).toEqual(true)
})

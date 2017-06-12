import React from 'react'
import { shallow } from 'enzyme'
import AddressForm from './AddressForm'

it('renders without crashing', () => {
  const wrapper = shallow(
    <AddressForm
      country={'BRA'}
      fields={[
        {
          name: 'street',
          value: 'Praia de Botafogo',
          valid: true,
          required: true,
        },
      ]}
      onChangeAddress={jest.fn()}
    />
  )
  const div = <div />
  expect(wrapper.contains(div)).toEqual(true)
})

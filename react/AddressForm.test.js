import React from 'react'
import { render, rendererCreate } from 'test-utils'
import AddressForm from './AddressForm'
import address from './__mocks__/newAddress'
import usePostalCode from './country/__mocks__/usePostalCode'

describe('AddressForm', () => {
  it('renders without crashing', () => {
    render(
      <AddressForm
        address={address}
        rules={usePostalCode}
        onChangeAddress={jest.fn()}
      />,
    )
  })

  it('should omit fields that are used in to get the postal code', () => {
    const tree = rendererCreate(
      <AddressForm
        address={address}
        rules={usePostalCode}
        onChangeAddress={jest.fn()}
      />
    )
    .toJSON()

    expect(tree).toMatchSnapshot()
  })
})

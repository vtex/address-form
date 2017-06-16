import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import AddressForm from './AddressForm'
import address from './__mocks__/newAddress'
import usePostalCode from './country/__mocks__/usePostalCode'

describe('AddressForm', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <AddressForm
        address={address}
        rules={usePostalCode}
        onChangeAddress={jest.fn()}
      />,
      div
    )
  })

  it('should omit fields that are used in to get the postal code', () => {
    const tree = renderer
      .create(
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

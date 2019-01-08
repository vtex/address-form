import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import AddressGeolocationForm from './AddressGeolocationForm'
import address from './__mocks__/newAddress'
import usePostalCode from './country/__mocks__/usePostalCode'

describe('AddressGeolocationForm', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <AddressGeolocationForm
        address={address}
        rules={usePostalCode}
        onChangeAddress={jest.fn()}
      />,
      div
    )
  })

  it('should omit no fields', () => {
    const tree = renderer
      .create(
        <AddressGeolocationForm
          address={address}
          rules={usePostalCode}
          onChangeAddress={jest.fn()}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})

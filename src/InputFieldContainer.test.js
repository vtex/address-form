import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'

import InputFieldContainer from './InputFieldContainer'
import DefaultInput from './DefaultInput'
import usePostalCode from './country/__mocks__/usePostalCode'
import address from './__mocks__/newAddress'
import INPUT_EXTRA_PROPS from './__mocks__/inputExtraProps'

describe('InputFieldContainer', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    const handleChange = jest.fn()

    ReactDOM.render(
      <InputFieldContainer
        Input={DefaultInput}
        field={{ name: 'postalCode' }}
        address={address}
        rules={usePostalCode}
        options={[]}
        inputExtraProps={INPUT_EXTRA_PROPS}
        onChangeAddress={handleChange}
      />,
      div,
    )
  })

  it('render InputFieldContainer and checks for inputExtraProps', () => {
    const handleChange = jest.fn()

    const wrapper = shallow(
      <InputFieldContainer
        Input={DefaultInput}
        field={{ name: 'postalCode' }}
        address={address}
        rules={usePostalCode}
        options={[]}
        inputExtraProps={INPUT_EXTRA_PROPS}
        onChangeAddress={handleChange}
      />,
    )

    expect(wrapper.find(DefaultInput).props()).toMatchObject(INPUT_EXTRA_PROPS)
  })
})

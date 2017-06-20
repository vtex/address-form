import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import CountrySelector from './CountrySelector'
import renderer from 'react-test-renderer'
import newAddress from './__mocks__/newAddress'

describe('CountrySelector', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <CountrySelector
        address={newAddress}
        shipsTo={['BRA', 'USA']}
        onChangeAddress={jest.fn()}
      />,
      div
    )
  })

  it('show options', () => {
    const tree = renderer
      .create(
        <CountrySelector
          address={newAddress}
          shipsTo={['BRA', 'USA']}
          onChangeAddress={jest.fn()}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('default value', () => {
    const tree = renderer
      .create(
        <CountrySelector
          address={{
            ...newAddress,
            country: { value: 'BRA' },
          }}
          shipsTo={['BRA', 'USA']}
          onChangeAddress={jest.fn()}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('react to change value', () => {
    const handleChange = jest.fn()
    const wrapper = shallow(
      <CountrySelector
        address={{
          ...newAddress,
          country: { value: 'BRA' },
        }}
        shipsTo={['BRA', 'USA']}
        onChangeAddress={handleChange}
      />
    )

    const event = { target: { value: 'USA' } }
    wrapper.find('select').simulate('change', event)

    expect(handleChange).toHaveBeenCalledWith({
      ...newAddress,
      country: { value: 'USA' },
    })
  })

  it('shold clean address delivery fields when country changes', () => {
    const handleChange = jest.fn()
    const wrapper = shallow(
      <CountrySelector
        address={{
          ...newAddress,
          country: { value: 'BRA' },
          postalCode: { value: '123' },
          state: { value: 'Foo' },
          city: { value: 'Bar' },
          neighborhood: { value: 'Baz' },
        }}
        shipsTo={['BRA', 'USA']}
        onChangeAddress={handleChange}
      />
    )

    const event = { target: { value: 'USA' } }
    wrapper.find('select').simulate('change', event)

    expect(handleChange).toHaveBeenCalledWith({
      ...newAddress,
      country: { value: 'USA' },
      postalCode: { value: null },
      state: { value: null },
      city: { value: null },
      neighborhood: { value: null },
    })
  })
})

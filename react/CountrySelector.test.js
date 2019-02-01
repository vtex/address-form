import React from 'react'
import { render, mount, rendererCreate } from 'test-utils'
import CountrySelector from './CountrySelector'
import newAddress from './__mocks__/newAddress'

describe('CountrySelector', () => {
  const shipsTo = [
    { value: 'BRA', label: 'Brazil' },
    { value: 'USA', label: 'United States of America' },
  ]

  it('renders without crashing', () => {
    render(
      <CountrySelector
        address={newAddress}
        shipsTo={shipsTo}
        onChangeAddress={jest.fn()}
      />,
    )
  })

  it('show options', () => {
    const tree = rendererCreate(
      <CountrySelector
        address={newAddress}
        shipsTo={shipsTo}
        onChangeAddress={jest.fn()}
      />
    )
    .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('default value', () => {
    const tree = rendererCreate(
      <CountrySelector
        address={{
          ...newAddress,
          country: { value: 'BRA' },
        }}
        shipsTo={shipsTo}
        onChangeAddress={jest.fn()}
      />
    )
    .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should sort the select', () => {
    const tree = rendererCreate(
      <CountrySelector
        address={{
          ...newAddress,
          country: { value: 'BRA' },
        }}
        shipsTo={shipsTo}
        onChangeAddress={jest.fn()}
      />
    )
    .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('react to change value', () => {
    const handleChange = jest.fn()
    const wrapper = mount(
      <CountrySelector
        address={{
          ...newAddress,
          country: { value: 'BRA' },
        }}
        shipsTo={shipsTo}
        onChangeAddress={handleChange}
      />
    )

    const event = { target: { value: 'USA' } }
    wrapper.find('select').simulate('change', event)

    expect(handleChange).toHaveBeenCalled()
  })

  it('should clean all input fields when country changes', () => {
    const handleChange = jest.fn()
    const wrapper = mount(
      <CountrySelector
        address={{
          ...newAddress,
          country: { value: 'BRA' },
          postalCode: { value: '123' },
          state: { value: 'Foo' },
          city: { value: 'Bar' },
          neighborhood: { value: 'Baz' },
        }}
        shipsTo={shipsTo}
        onChangeAddress={handleChange}
      />
    )

    const event = { target: { value: 'USA' } }
    wrapper.find('select').simulate('change', event)

    expect(handleChange).toHaveBeenCalledWith({
      country: { value: 'USA' },
      city: { value: null },
      complement: { value: null },
      geoCoordinates: { value: [] },
      neighborhood: { value: null },
      number: { value: null },
      postalCode: { value: null },
      reference: { value: null },
      state: { value: null },
      street: { value: null },
    })
  })
})

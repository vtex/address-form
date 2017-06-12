import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import CountrySelector from './CountrySelector'
import renderer from 'react-test-renderer'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <CountrySelector
      selected={'BRA'}
      shipsTo={['BRA', 'USA']}
      onChangeSelectedCountry={jest.fn()}
    />,
    div
  )
})

it('show options', () => {
  const tree = renderer
    .create(
      <CountrySelector
        shipsTo={['BRA', 'USA']}
        onChangeSelectedCountry={jest.fn()}
      />
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})

it('default value', () => {
  const tree = renderer
    .create(
      <CountrySelector
        country={'BRA'}
        shipsTo={['BRA', 'USA']}
        onChangeSelectedCountry={jest.fn()}
      />
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})

it('react to change value', () => {
  const handleChange = jest.fn()
  const wrapper = shallow(
    <CountrySelector
      country={'BRA'}
      shipsTo={['BRA', 'USA']}
      onChangeSelectedCountry={handleChange}
    />
  )

  const event = { target: { value: 'USA' } }
  wrapper.find('select').simulate('change', event)

  expect(handleChange).toHaveBeenCalledWith('USA')
})

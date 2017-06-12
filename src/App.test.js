import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const shipsTo = []
  ReactDOM.render(<App shipsTo={shipsTo} onChangeAddress={jest.fn()} />, div)
})

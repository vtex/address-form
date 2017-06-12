import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import mock from './mock'

const fn = address => {
  console.log(address)
}

ReactDOM.render(
  <App shipsTo={mock.shipsTo} onChangeAddress={fn} />,
  document.getElementById('root')
)

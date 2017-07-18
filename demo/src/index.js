import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Container from './Container'

const root = document.getElementById('demo')
const renderApp = Root => {
  ReactDOM.render(
    <AppContainer>
      <Root />
    </AppContainer>,
    root
  )
}

renderApp(Container)

if (module.hot) {
  module.hot.accept('./Container', () => {
    const NewApp = require('./Container').default
    renderApp(NewApp)
  })
}

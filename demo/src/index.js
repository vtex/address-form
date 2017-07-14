import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './App'

const root = document.getElementById("demo");
const renderApp = Root => {
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    root
  )
}

const styles = document.createElement("div");
const parentDiv = root.parentNode;

parentDiv.insertBefore(styles, demo);

ReactDOM.render(
  <div>
    <link rel="stylesheet" href="//io.vtex.com.br/front-libs/bootstrap/2.3.2/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="//io.vtex.com.br/front-libs/bootstrap/2.3.2/css/bootstrap-responsive.min.css"/>
    <link rel="stylesheet" href="//io.vtex.com.br/front-libs/font-awesome/3.2.1/css/font-awesome.min.css"/>
    <link rel="stylesheet" href="//io.vtex.com.br/checkout-ui/5.5.2/style/style.css"/>
  </div>,
  styles
)

renderApp(App)

if (module.hot) {
  module.hot.accept('./App', () => {
    const NewApp = require('./App').default
    renderApp(NewApp)
  })
}

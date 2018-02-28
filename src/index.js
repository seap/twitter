import 'babel-polyfill'
import 'lib-flexible'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './store'
import App from './containers/App'
import '@/styles/index.scss'
import '@/styles/reset_antd.css'

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.querySelector('#root')
)
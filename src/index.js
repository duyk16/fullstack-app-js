import React, { Component } from 'react'
import { Provider } from 'react-redux'

import App from './Container';
import store from './redux/store'

export default class index extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

import { createStore } from 'redux'
import reducer from '../reducers'

const store = createStore(reducer)

store.subscribe(function () {
  console.log(store.getState())
})

export default store
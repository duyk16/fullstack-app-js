import { combineReducers } from 'redux'

import userReducer from './user.reducer'
import homeReducer from './home.reducer'

export default combineReducers({
  userReducer,
  homeReducer
})
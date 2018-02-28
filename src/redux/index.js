import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import common from './common'
import twitter from './twitter'

export default combineReducers({
  routing: routerReducer,
  common,
  twitter
})

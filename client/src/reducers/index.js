import { combineReducers } from 'redux'

import userReducer from './userReducer.js'
import stockReducer from './stockReducer'

export default combineReducers({
  user: userReducer,
  stocks: stockReducer
})

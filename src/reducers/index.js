import { combineReducers } from 'redux'
import auth from './auth.js'

const rootReducer = combineReducers({
  auth: auth,
})

export default rootReducer

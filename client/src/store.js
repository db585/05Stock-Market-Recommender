import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

// In index.js we exported combineReducers variable, but since it was default export we can name it here as we want
import rootReducers from './reducers/index'

const initialState = {}

const middleware = [thunk]
// devs only
// const middleware = []

const store = createStore(
  rootReducers, // reducer,
  initialState, // InitialState
  compose( // Middleware and Redux dev tools extension. Compose - https://redux.js.org/api/compose
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

export default store

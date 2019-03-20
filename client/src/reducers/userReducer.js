import { LOGGEDIN } from '../actions/types'

const initialState = {
  loggedIn: false
}

export default (state = initialState, { type, payload }) => {
  console.log('from userReducer payload ', payload)
  switch (type) {
    case LOGGEDIN:
      return {
        ...state,
        loggedIn: payload.loggedIn
      }
    default:
      return state
  }
}

import { LOGGEDIN } from './types'

export const loginAction = () => dispatch => {
  dispatch({
    type: LOGGEDIN,
    payload: { loggedIn: true }
  })
}

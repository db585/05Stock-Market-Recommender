// For future using. No functionality in v1.0
import { LOGGEDIN } from './types'

export const loginAction = () => dispatch => {
  dispatch({
    type: LOGGEDIN,
    payload: { loggedIn: true }
  })
}

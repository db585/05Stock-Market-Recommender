// eslint-disable-next-line
import { FETCH_SOCIAL} from '../actions/types'

const initialState = {
  social: null
}

export default (state = initialState, { type, payload }) => {
  // console.log('from socialReducer payload', payload)
  switch (type) {
    case FETCH_SOCIAL:
      return {
        ...state,
        social: payload
      }

    default:
      return state
  }
}

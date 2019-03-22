// eslint-disable-next-line
import { FETCH_STOCKS, FETCH_STOCK_SYMBOLS} from '../actions/types'

const initialState = {
  stock: null,
  allStocks: {}
}

export default (state = initialState, { type, payload }) => {
  // console.log('from FETCH_STOCKS payload', payload)
  switch (type) {
    case FETCH_STOCKS:
      return {
        ...state,
        stock: payload
      }
    case FETCH_STOCK_SYMBOLS:
      // console.log('payload from FETCH_STOCK_SYMBOLS', payload)
      return {
        ...state,
        allStocks: payload

      }

    default:
      return state
  }
}

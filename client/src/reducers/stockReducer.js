import { FETCH_STOCKS, FILTER_BY_NAME_STOCKS, UNFILTER_STOCKS } from '../actions/types'

const initialState = {
  stock: [],
  allStocks: []
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_STOCKS:
      return {
        ...state,
        allStocks: payload,
        items: payload
      }
    case FILTER_BY_NAME_STOCKS:
      console.log('payload from stockReducer', payload)
      return {
        ...state,
        items: state.allStocks.filter((stock) => {
          return stock.symbol === payload
        })
      }
    case UNFILTER_STOCKS:
      console.log('payload UNFILTERED from stockReducer', payload)
      return {
        ...state,
        items: state.allItems
      }
    default:
      return state
  }
}

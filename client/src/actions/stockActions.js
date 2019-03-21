// eslint-disable-next-line
import { FETCH_STOCKS, FILTER_BY_NAME_STOCKS, UNFILTER_STOCKS } from '../actions/types'
import axios from 'axios'

export const fetchStocksAction = () => async dispatch => {
  try {
    // console.log('from fetchStocksAction from stockActions')
    const data = await (await axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=LOGM&apikey=7QVG6CNCMNH2FPG2')).data
    console.log('axios data', data)
    dispatch({
      type: FETCH_STOCKS,
      payload: { [`${data['Meta Data']['2. Symbol']}`]: data['Time Series (Daily)'] }
    })
  } catch (err) {
    console.log('err is ', err)
  }
}

// export const filterByCategory = (category) => async dispatch => {
//   try {
//     dispatch({
//       type: FILTER_BY_CATEGORY_ITEMS,
//       payload: category
//     })
//   } catch (err) {
//     console.log('err is ', err)
//   }
// }

// export const filterWildSearch = (arrSearch) => async dispatch => {
//   try {
//     dispatch({
//       type: FILTER_WILD_SEARCH,
//       payload: arrSearch
//     })
//   } catch (err) {
//     console.log('err is ', err)
//   }
// }

// export const unfilterItems = () => async dispatch => {
//   console.log('unfilterItems from itemActions')
//   try {
//     dispatch({
//       type: UNFILTER_ITEMS
//     })
//   } catch (err) {
//     console.log('err is ', err)
//   }
// }

// TODO: AddItem should be transfered here if we need it

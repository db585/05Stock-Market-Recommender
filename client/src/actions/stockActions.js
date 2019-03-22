// eslint-disable-next-line
import { FETCH_STOCKS, FETCH_STOCK_SYMBOLS } from '../actions/types'
import axios from 'axios'
import symbols from '../data/symbols.json'

export const fetchStocksAction = (smbl = 'LOGM') => async dispatch => {
  try {
    // console.log('from fetchStocksAction from stockActions')
    const data = await (await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${smbl}&apikey=7QVG6CNCMNH2FPG2`)).data
    console.log('axios data', data)
    dispatch({
      type: FETCH_STOCKS,
      payload: { [`${data['Meta Data']['2. Symbol']}`]: data['Time Series (Daily)'] }
    })
  } catch (err) {
    console.log('err is ', err)
  }
}
export const fetchStockSymbolsAction = () => async dispatch => {
  try {
    // Server has CORS policy. No success with changing axios or fetch parameters
    // So we upload all symbols from json file as temp solution
    // console.log('from fetchStocksAction from stockActions')
    // axios.defaults.headers.get['Content-Type'] = 'application/json'
    // const data = await (await window.fetch('users.json'
    // )).json()
    // console.log('axios data', data)
    // // const response = await (await window.fetch(`https://financialmodelingprep.com/api/stock/list/all`)).json()
    // // console.log('axios data', data)

    // console.log('users', users)
    dispatch({
      type: FETCH_STOCK_SYMBOLS,
      payload: symbols
    })
  } catch (err) {
    console.log('err is ', err)
  }
}

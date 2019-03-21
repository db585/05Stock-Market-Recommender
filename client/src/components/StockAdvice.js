import React, { Component } from 'react'
import { containerStyle } from '../appStyle'
import { connect } from 'react-redux'
import { fetchStocksAction } from '../actions/stockActions'

export class StockAdvice extends Component {
  componentDidMount () {
    // setTimeout(this.props.fetchStocksAction, 1000)
    this.props.fetchStocksAction()
  }

  render () {
    const getStocks = () => {
      // Destruct
      let { stock } = this.props
      console.log('this.props.stock', stock)

      // Check fetched data. if not show loading
      if (stock === null) {
        console.log('here')
        return (
          <React.Fragment>
            Loading...
          </React.Fragment>

        )
      }

      // Data fetched
      // Get symbol of stock from
      let stockSymbol = Object.keys(stock)

      // Loop through nested object and get data and close price
      const getDataPrice = (stock) => {
        return Object.keys(stock).map(smbl => {
          // console.log('smbl', smbl)
          const dataArr = Object.keys(stock[smbl])
          return dataArr.map(data => {
            // Convert to float to calculate difference later probably
            const price = parseFloat(stock[smbl][data]['4. close']).toFixed(2)
            // console.log('price', price, typeof price)
            return (
              <div key={Date.parse(data)}>
                {data} {price}
              </div>
            )
          })
        })
      }

      return (
        <div>
          <React.Fragment>
            {stockSymbol}
          </React.Fragment>
          <hr />
          <React.Fragment>
            {getDataPrice(stock)}
          </React.Fragment>
        </div>
      )
    }
    return (
      <div style={containerStyle} >
        {getStocks()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    stock: state.stocks.stock
  }
}
export default connect(
  mapStateToProps,
  { fetchStocksAction }
)(StockAdvice)

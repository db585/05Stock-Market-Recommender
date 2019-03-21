import React, { Component } from 'react'
import { containerStyle } from '../appStyle'
import { connect } from 'react-redux'
import { fetchStocksAction } from '../actions/stockActions'
import { fetchSocialAction } from '../actions/socialActions'

export class StockAdvice extends Component {
  componentDidMount () {
    // To check a pause for future loading from BackEnd
    // setTimeout(this.props.fetchStocksAction, 1000)

    // Instead of stockPriceGenerator asked by Technical Requirement
    this.props.fetchStocksAction()

    // Instead of socialMediaCountGenerator by Technical Requirement
    this.props.fetchSocialAction({
      smbl: 'LOGM',
      media: 'Twitter'
    })
  }

  render () {
    const getStocks = () => {
      // Destruct
      let { stock, social } = this.props
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

      const getSocialOnDate = (smbl, date, media) => {
        // console.log('smbl', smbl, 'date', date, 'media', media)
        try {
          return social[smbl][date]['Twitter']
        } catch (error) {
          return 0
        }
        // const socialData = social[smbl][date][media]
        // return social[smbl][date]['Twitter'] ? parseInt(social[smbl][date]['Twitter']) : 0
        // return 0
      }

      // Loop through nested objects and get date, close price, social
      const getStockSocialData = () => {
        return stockSymbol.map(smbl => {
          // console.log('smbl', smbl)
          const dateArr = Object.keys(stock[smbl])
          return dateArr.map(date => {
            // Convert to float to calculate difference later probably
            const priceOnDate = parseFloat(stock[smbl][date]['4. close']).toFixed(2)

            const twitterOnDate = getSocialOnDate(smbl, date, 'Twitter')
            // console.log('price', price, typeof price)
            return (
              // Key is milliseconds from 1970 for each date
              <div key={Date.parse(date)}>
                {date} {priceOnDate} {twitterOnDate}
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
            {getStockSocialData()}
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
    stock: state.stocks.stock,
    social: state.social.social
  }
}
export default connect(
  mapStateToProps,
  { fetchStocksAction, fetchSocialAction }
)(StockAdvice)

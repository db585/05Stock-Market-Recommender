import React, { Component } from 'react'
import { containerStyle } from '../appStyle'
import { connect } from 'react-redux'
import { fetchStocksAction } from '../actions/stockActions'
import { fetchSocialAction } from '../actions/socialActions'

export class StockAdvice extends Component {
  // devs  Test API data only
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
      // console.log('this.props.stock', stock)

      // Check fetched data. if not show loading
      if (stock === null) {
        // console.log('stock is null')
        // TODO: Re-handle fetching data from moment of submit to moment of data loaded
        return (
          <React.Fragment>
            {/* Loading... */}
          </React.Fragment>

        )
      }

      // Data fetched
      // Get symbol of stock from
      let stockSymbol = Object.keys(stock)

      /// / Used in first version. Now we get it from recommendationAlgorithm
      // const getSocialOnDate = (smbl, date, media) => {
      //   // console.log('smbl', smbl, 'date', date, 'media', media)
      //   try {
      //     return social[smbl][date][media]
      //   } catch (error) {
      //     return 0
      //   }
      //   // const socialData = social[smbl][date][media]
      //   // return social[smbl][date]['Twitter'] ? parseInt(social[smbl][date]['Twitter']) : 0
      //   // return 0
      // }

      // Suppose that social media give a trend which drives normal life of the company and company marketing team efforts.
      // If we have less than average posts means company is doing good and continue its business which means `buy` recommendation
      // If we have a splash of activity in social we have a bad news for a company usually which mean `sell` recommendation.
      // Calculate nth days average for social post. nth depends on strategy risk. The less n the more risky your behavior.
      // If current date social post number is more than 10% of average then `sell` recommendation, less than 10% - buy, inside 10% - hold recommendation.
      const recommendationAlgorithm = (n = 30, smbl, date, media, percent) => {
        // console.log('n', n, 'smbl', smbl, 'date', date, 'media', media)
        const objReturn = {}
        try {
          // Calculate n-th day average
          // Create array of social numbers
          const postNumArr = []
          const socNumOnDate = social[smbl][date][media]
          objReturn.socNumOnDate = socNumOnDate
          let dateArr = Object.keys(stock[smbl])
          dateArr = dateArr.slice(dateArr.indexOf(date), dateArr.indexOf(date) + n)
          // console.log('dateArr', dateArr)
          dateArr.forEach(d => {
            postNumArr.push(social[smbl][d][media])
          })
          // console.log('postNumArr', postNumArr)
          let average = parseInt(postNumArr.reduce((total, num) => total + num, 0) / n)
          // console.log('average', average)
          objReturn.average = average

          // Create recommendation
          // Digits are faster than text
          // -1 - sell, 0 - hold, 1 - buy
          if (average * (1 + percent / 100) < socNumOnDate) {
            objReturn.recom = -1
          } else if (average * (1 - percent / 100) > socNumOnDate) {
            objReturn.recom = 1
          } else {
            objReturn.recom = 0
          }
          return objReturn
        } catch (error) {
          return objReturn
        }
      }

      const getRecommIcon = (recom) => {
        if (recom.recom === 1) {
          return (
            <i className='far fa-arrow-alt-circle-up' style={{ color: 'green' }} />
          )
        } else if (recom.recom === -1) {
          return (
            <i className='far fa-arrow-alt-circle-down' style={{ color: 'red' }} />
          )
        } else {
          return (
            <i className='fas fa-hand-holding-usd' style={{ color: 'blue' }} />
          )
        }
      }

      // Loop through nested objects and get date, close price, social
      const getStockSocialData = () => {
        return stockSymbol.map(smbl => {
          // console.log('smbl', smbl)
          const dateArr = Object.keys(stock[smbl])
          return dateArr.map(date => {
            // Convert to float to calculate difference later probably
            const priceOnDate = parseFloat(stock[smbl][date]['4. close']).toFixed(2)

            // const twitterOnDate = getSocialOnDate(smbl, date, 'Twitter')
            // console.log('price', price, typeof price)

            let recom = recommendationAlgorithm(10, smbl, date, 'Twitter', 20)
            // console.log('recom', recom)
            return (
              // Key is milliseconds from 1970 for each date
              <div key={Date.parse(date)}>
                {date} {priceOnDate} {recom.socNumOnDate} {recom.average} {recom.recom} {getRecommIcon(recom)}
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

import React, { Component } from 'react'
import { containerStyle } from '../appStyle'
import { connect } from 'react-redux'

import { fetchStockSymbolsAction } from '../actions/stockActions'
import { fetchStocksAction } from '../actions/stockActions'
import { fetchSocialAction } from '../actions/socialActions'

export class StockForm extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      inputSymbol: '',
      msgs: {symbol: ''}
    }
  }
  
  componentDidMount () {
    this.props.fetchStockSymbolsAction()
  }

  // Put enter in state and check for stock symbol
  handleInputSymbol = e => {
    // console.log('handleInputSymbol e.currentTarget.value ', e.currentTarget.value )
    let {value} = e.currentTarget
    value = value.toUpperCase()
    this.setState({ inputSymbol: value, msgs: {symbol: ''} })
    // console.log('this.props.allStocks', this.props.allStocks)
    let smblArr = this.props.allStocks.map(el=> el['Ticker'])
    // console.log('smblArr', smblArr)
    // console.log('smblArr.indexOf(value)', smblArr.indexOf(value))

    // If symbol exists we put company name in msg object to render after
    if( smblArr.indexOf(value) === -1) {
      this.setState({ inputSymbol: value, msgs: {symbol: 'Symbol Not Found'} })
    } else {
      let companyName = this.props.allStocks.filter(el=> el['Ticker']===value)[0]['companyName']
    console.log('companyName', companyName)
      this.setState({ inputSymbol: value, msgs: {symbol: companyName} })
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    console.log('handleSubmit')
    const stockSmbl = this.state.inputSymbol.toUpperCase()
    console.log('stockSmbl', stockSmbl)

    // Verify for input
    // Earlier version before we brought all symbols 
    const regexSmbl = /[A-Z]/
  if(!stockSmbl.match(regexSmbl)) {
    console.log('not match')
    this.setState({
      msgs: {symbol: 'Please check your input'}
    })
  } else {
    // To check a pause for future loading from BackEnd
    // setTimeout(this.props.fetchStocksAction, 1000)

    // Instead of stockPriceGenerator asked by Technical Requirement
    this.props.fetchStocksAction(stockSmbl)

    // Instead of socialMediaCountGenerator by Technical Requirement
    // Twitter is the only media for v1.0
    this.props.fetchSocialAction({
      smbl: stockSmbl,
      media: 'Twitter'
    })

    // Empty input field
    this.setState({
      inputSymbol:''
    })
  }


  }

  render () {
    return (
      <div style={containerStyle}>
        <form onSubmit={this.handleSubmit}>
          <input
            style={{fontSize: '1em'}}
            name='symbol'
            type='search'
            placeholder='Enter Stock Symbol'
            onChange={this.handleInputSymbol}
            value={this.state.inputSymbol}
            // className='form-input-search-add'
          />
          <input
            type='submit'
            name='Submit'
            onChange={this.handleInputSymbol}
            value={this.props.handleInputSymbol}
            style={{background: 'orange', borderRadius: '5px', fontSize: '1em', margin:'0'}}
          />
          <small style={{display:'block', color:'blue', fontSize: '0.8em'}}>{this.state.msgs.symbol}</small>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    stock: state.stocks.stock,
    allStocks: state.stocks.allStocks
  }
}
export default connect(mapStateToProps,
  { fetchStockSymbolsAction, fetchStocksAction, fetchSocialAction }
)(StockForm)
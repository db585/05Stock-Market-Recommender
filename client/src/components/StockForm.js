import React, { Component } from 'react'
import { containerStyle } from '../appStyle'
import { connect } from 'react-redux'

import { fetchStocksAction } from '../actions/stockActions'
import { fetchSocialAction } from '../actions/socialActions'

export class StockForm extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      inputSymbol: '',
      errors: {symbol: ''}
    }
  }
  
  handleInputSymbol = e => {
    // console.log('handleInputSymbol e.currentTarget.value ', e.currentTarget.value )
    this.setState({ inputSymbol: e.currentTarget.value, errors: {symbol: ''} })
  }

  handleSubmit = e => {
    e.preventDefault()
    console.log('handleSubmit')
    const stockSmbl = this.state.inputSymbol.toUpperCase()
    console.log('stockSmbl', stockSmbl)
    // Verify for input
    const regexSmbl = /[A-Z]/
  if(!stockSmbl.match(regexSmbl)) {
    console.log('not match')
    this.setState({
      errors: {symbol: 'Please check your input'}
    })
  } else {
    // To check a pause for future loading from BackEnd
    // setTimeout(this.props.fetchStocksAction, 1000)

    // Instead of stockPriceGenerator asked by Technical Requirement
    this.props.fetchStocksAction(stockSmbl)

    // Instead of socialMediaCountGenerator by Technical Requirement
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
            style={{background: 'orange', borderRadius: '5px', fontSize: '0.8em'}}
          />
          <small style={{display:'block', color:'red', fontSize: '0.1em'}}>{this.state.errors.symbol}</small>
        </form>
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
export default connect(mapStateToProps,
  { fetchStocksAction, fetchSocialAction }
)(StockForm)
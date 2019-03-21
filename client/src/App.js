import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css'
// import { connect } from 'react-redux'

import Navbar from './components/Navbar'
import StockForm from './components/StockForm'
import StockAdvice from './components/StockAdvice'
import About from './components/About'

class App extends Component {
  renderHome () {
    // console.log('Home page rendered')
    return (
      <div>
        <StockForm />
        <StockAdvice />
      </div>
    )
  }
  render () {
    return (
      <BrowserRouter>
        <div className='App'>
          <Navbar />
          <Route exact path='/' render={this.renderHome} />
          <Route exact path='/about' component={About} />
        </div>
      </BrowserRouter>

    )
  }
}

export default App

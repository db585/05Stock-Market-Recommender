import React from 'react'
import { containerStyle } from '../appStyle'

export default function About () {
  return (
    <div style={containerStyle}>
      <div style={{ padding: '1px' }}>
        <p>
          Behavioral Finance is an exciting field. and we've decided to jump in with an idea how to help people with their investments.
        </p>
        <p>
          In an earlier experimentation we've noticed a correlation
          between the various social media posts on a stock symbol and that share price for that stock symbol.
        </p>
        <p>
          We’ve decided to build an app that can provide a buy, hold or sell recommendation when given a stock symbol. The recommendation adjusts itself based on data.
        </p>
      </div>
    </div>
  )
}

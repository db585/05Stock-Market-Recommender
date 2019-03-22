import React from 'react'
import { containerStyle } from '../appStyle'

export default function About () {
  return (
    <div style={containerStyle}>
      <div style={{ padding: '1px' }}>
        <p>
          Behavioral Finance is an exciting field. and we've decided to jump in with an idea of how to help people with their investments.
        </p>
        <p>
          In earlier experimentation, we've noticed a correlation between the various social media posts on a stock symbol and that share price for that stock symbol.
        </p>
        <p>
          We’ve decided to build an app that can provide a buy, hold or sell recommendation when given a stock symbol. The recommendation adjusts itself based on data.
        </p>
        <p>
          We discovered that social media give a trend which drives the normal life of the company and company marketing team efforts.
        </p>
        <p>
          If we have less than average posts means the company is doing good and continue its business which means Buy recommendation.
        </p>
        <p>
          If we have a splash of activity in social media we have bad news for the company usually which means Sell recommendation.
        </p>
        <p>
          We plan to give a choice to choose your own strategy. The strategy based on nth days averages for social posts. The less n the more frequently You need to do an action the riskier your strategy.
        </p>
        <p>
          Our base strategy is following:
        </p>
        <p>
          If current date social post number is more than 20% of average then You have a Sell recommendation, less than 20% - Buy recommendation, inside 20% from the average - Hold recommendation.
        </p>
      </div>
    </div>
  )
}

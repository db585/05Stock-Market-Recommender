import { FETCH_SOCIAL } from '../actions/types'
// import axios from 'axios'

// socialMediaCountGenerator in the Technical Requirements
// Generate  random number of posts for each `media`.
// TODO: Adjust normal calendar to work day calendar. Need to be explore to real life behavior and statistics. How weekend number influence Monday's price
export const fetchSocialAction = (paramObj) => async dispatch => {
  try {
    // console.log('from fetchSocialAction from socialActions')

    // Destruct from paramObj
    let { smbl, media } = paramObj

    let socialObj = {}
    let dateGen = new Date('2019-01-01T00:00:00')
    // console.log('dateGen', dateGen)
    let dataFin = Date.now()
    // console.log('dataFin', Date(dataFin))
    while (dateGen < dataFin) {
      // console.log('dateGen', dateGen)
      socialObj[dateGen.toISOString().split('T')[0]] = { [media]: Math.floor(Math.random() * 10000) }
      dateGen.setDate(dateGen.getDate() + 1)
      // console.log('dataGen', dateGen)
    }
    dispatch({
      type: FETCH_SOCIAL,
      payload: { [smbl]: socialObj }
    })
  } catch (err) {
    console.log('err is ', err)
  }
}

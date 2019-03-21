import { FETCH_SOCIAL } from '../actions/types'
// import axios from 'axios'

// socialMediaCountGenerator in the Technical Requirements
export const fetchSocialAction = (paramObj) => async dispatch => {
  try {
    // console.log('from fetchSocialAction from socialActions')

    // Destruct from paramObj
    let { smbl, media } = paramObj

    let socialObj = {}
    let dateGen = new Date('2019-03-01T00:00:00')
    // console.log('dateGen', dateGen)
    let dataFin = Date.now()
    console.log('dataFin', Date(dataFin))
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

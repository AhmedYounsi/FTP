import axios from 'axios'
import api from '../utils/api'

export const AddEventAction = async (data, TokenReducer, history) => {
  // console.log(data)
  // return
  try {
    const res = await api.post('/events', data, {
      headers: {
        Authorization: TokenReducer,
      },
    })
    if (res)
      history.push({
        pathname: '/calendar',
      })
  } catch (error) {
    console.log(error)
  }
}

export const GetAllEvent = async (TokenReducer) => {
  try {
    const res = await api.get(`/events`, {
      headers: {
        Authorization: TokenReducer,
      },
    })
    return res.data
  } catch (err) {
    console.log(err)
  }
}

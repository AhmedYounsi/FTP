import axios from 'axios'
import api from '../utils/api'

export const GetUsers = async () => {
  try {
    const res = await api.get('/users/get_all')
    return res.data
  } catch (error) {
    return error.response
  }
}


export const DelUser = async (TokenReducer,id) => {
  try {
    const res = await api.delete(`/users`, {
      data: { id: id},
      headers: { Authorization: TokenReducer },
    })
  return res
  } catch (error) {
    return error.response
  } 
}


export const GetUsersId = async (UserID) => {
  try {
    const res = await api.get('/users')
    console.log(res) 
  } catch (error) {
    return error.response
  }
}

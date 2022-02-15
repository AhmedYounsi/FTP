const UserReducer = (
  state = JSON.parse(localStorage.getItem('USER_INFO') || '[]'),
  action,
) => {
 
  switch (action.type) {
    case 'SET_USER':
      localStorage.setItem('USER_INFO', JSON.stringify(action.payload))
      return action.payload

    case 'REMOVE_USER':
      localStorage.removeItem('USER_INFO')
      return null

    default:
      return state
  }
}

export default UserReducer

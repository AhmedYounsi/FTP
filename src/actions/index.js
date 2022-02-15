export const SetToken = (token) => {
  return {
    type: 'TOKEN',
    payload: token,
  }
}

export const RemoveToken = () => {
  return {
    type: 'REMOVE_TOKEN',
  }
}

 
 
export const setUserData = (user) => {
  return {
    type: 'SET_USER',
    payload: user,
  }
}



export const removeUserData = () => {
  return {
    type: 'REMOVE_USER',
  }
}


export const ToggleSidebar = () => {
  return {
    type: 'Toggle_Sidebar',
  }
}

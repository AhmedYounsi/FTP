const sidebarShow = (state = true, action) => {
  switch (action.type) {

    case "Toggle_Sidebar":
  
      return !state;
 
    default:
      return state;
  }
};

export default sidebarShow;
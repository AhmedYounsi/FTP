const TokenReducer = (state = localStorage.getItem("TOKEN_"), action) => {
    switch (action.type) {
  
      case "SET_TOKEN":
        localStorage.setItem("TOKEN_", action.payload);
        return action.payload;
  
      case "REMOVE_TOKEN":
        localStorage.removeItem("TOKEN_");
        return null;
  
      default:
        return state;
    }
  };
  
  export default TokenReducer;
import TokenReducer from "./TokenReducer";
import UserReducer from './UserReducer'
import { combineReducers } from "redux";
import sidebarShow from "./sidebarShow";

const AllReducers = combineReducers({
  TokenReducer: TokenReducer,
   UserReducer : UserReducer,
   sidebarShow :sidebarShow
});

export default AllReducers;
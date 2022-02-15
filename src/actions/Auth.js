import axios from "axios";
import api from "../utils/api";

export const LoginAction = async (body, dispatch) => {
  try {
    const res = await api.post("/users/signin", body);
   
    dispatch({
      type: "SET_TOKEN",
      payload: res.data.token,
    });
    dispatch({
      type: "SET_USER",
      payload: res.data.user,
    });
  
  } catch (err) {
    return err.response;
  }
};

// Register User
export const RegisterAction = async (userData, history) => {
  try {
    const res = await api.post("/users", userData);
    if (res)
      history.push({
        pathname: "/liste_employee",
        state: { userIsSaved: true },
      });
      return res
  } catch (err) {
    return err.response;
  }
};

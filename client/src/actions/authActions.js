import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import {appSessionStorage} from "../utils/storage/sessionStorage";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING
} from "./types";

export const setCurrentUser = decoded => ({
  type: SET_CURRENT_USER,
  payload: decoded
})

export const setUserLoading = (flag = true) => ({
  type: USER_LOADING,
  flag
})

// SignUp user
export const signUpUser = (userData, history) => dispatch => {
  
  dispatch(setUserLoading(true));
  
  axios
  .post("/v1/signup",userData)
    .then(res => {
		dispatch(setUserLoading(false));
		history.push("/")
	})
    .catch(err=>{
	  dispatch(setUserLoading(false));
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
}

// login User
export const loginUser = (userData) => dispatch => {
  
  dispatch(setUserLoading(true));
  
  axios
    .post("/v1/login",userData)
    .then(res => {
      const data = res.data.data[0];
      // eslint-disable-next-line camelcase
      const {access_token} = data;
      localStorage.setItem("jwtToken",access_token);
      setAuthToken(access_token);
      // Decode token to get user data
      // const decoded = jwt_decode(token);
      // Set current user
      dispatch(setUserLoading(false));
      dispatch(setCurrentUser(data));
    })
    .catch(err=>{
	  dispatch(setUserLoading(false));
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
}

export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  // isAuthenticated to false
  dispatch(setCurrentUser({}));
  appSessionStorage.clear();
}

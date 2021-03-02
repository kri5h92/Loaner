import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING
} from "./types";

export const setCurrentUser = decoded => ({
  type: SET_CURRENT_USER,
  payload: decoded
})

export const setUserLoading = () => ({
  type: USER_LOADING
})

// SignUp user
export const signUpUser = (userData, history) => dispatch => {
  axios
  .post("/v1/signup",userData)
    .then(res => history.push("/"))
    .catch(err=>{
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
}

// login User
export const loginUser = (userData) => dispatch => {
  axios
    .post("/v1/login",userData)
    .then(res => {
      // eslint-disable-next-line camelcase
      const {access_token} = res.data;
      localStorage.setItem("jwtToken",access_token);
      setAuthToken(access_token);
      // Decode token to get user data
      // const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(res.data));
    })
    .catch(err=>{
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
}

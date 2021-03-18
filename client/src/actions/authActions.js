import { toast } from 'react-toastify';

import { authLogin, authSignUp } from '../services/api';
import setAuthToken from '../utils/setAuthToken';
import { appSessionStorage } from '../utils/storage/sessionStorage';
import { ACCESS_TOKEN } from '../utils/constants';
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from './types';

export const setCurrentUser = (decoded) => ({
  type: SET_CURRENT_USER,
  payload: decoded
});

export const setUserLoading = (flag = true) => ({
  type: USER_LOADING,
  flag
});

// SignUp user
export const signUpUser = (userData, history) => (dispatch) => {
  dispatch(setUserLoading(true));

  authSignUp
    .post(userData)
    .then(() => {
      dispatch(setUserLoading(false));
      appSessionStorage.clear();
      toast.success('User successfully registered');
      history.push('/');
    })
    .catch((err) => {
      toast.error('Unable to register user');
      dispatch(setUserLoading(false));
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

// login User
export const loginUser = (userData) => (dispatch) => {
  dispatch(setUserLoading(true));

  authLogin
    .post(userData)
    .then((res) => {
      const data = res.data[0];
      // eslint-disable-next-line camelcase
      const { access_token } = data;
      appSessionStorage.setItem(ACCESS_TOKEN, access_token);
      setAuthToken(access_token);
      // Decode token to get user data
      // const decoded = jwt_decode(token);
      // Set current user
      dispatch(setUserLoading(false));
      dispatch(setCurrentUser(data));
      toast.success('User successfully loged in');
    })
    .catch((err) => {
      dispatch(setUserLoading(false));
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
      toast.error('Unable to loged in');
    });
};

export const logoutUser = () => (dispatch) => {
  setAuthToken(false);
  // isAuthenticated to false
  dispatch(setCurrentUser({}));
  appSessionStorage.clear();
  toast.success('Log out successfully');
};

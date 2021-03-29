import { toast } from 'react-toastify';

import { authLogin, authSignUp } from '../services/api';
import setAuthToken from '../utils/setAuthToken';
import { appLocalStorage } from '../utils/storage';
import { ACCESS_TOKEN } from '../utils/constants';
import { SET_CURRENT_USER, USER_LOADING } from './types';
import {setErrors} from './errorActions';

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
      toast.success('User successfully registered');
      history.push('/');
    })
    .catch((err) => {
      toast.error('Unable to register user');
      dispatch(setUserLoading(false));
      dispatch(setErrors(err.response.data.errors));
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
      appLocalStorage.setItem(ACCESS_TOKEN, access_token);
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
      dispatch(setErrors(err.response.data.errors));
      // toast.error('Unable to loged in');
    });
};

export const logoutUser = () => (dispatch) => {
  setAuthToken(false);
  // isAuthenticated to false
  dispatch(setCurrentUser({}));
  appLocalStorage.clear();
  toast.success('Log out successfully');
};

import { PURGE_ERRORS, SET_ERRORS } from './types';

export const purgeErrors = () => ({ type: PURGE_ERRORS });

export const setErrors = (errors) => ({
  type: SET_ERRORS,
  payload: errors
});

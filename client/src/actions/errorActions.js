import { PURGE_ERRORS } from './types';

export const purgeErrors = () => (dispatch) => {
  dispatch({
    type: PURGE_ERRORS
  });
};

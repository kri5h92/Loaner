import { SET_ERRORS, PURGE_ERRORS } from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return action.payload;
    case PURGE_ERRORS:
      return {};
    default:
      return state;
  }
}

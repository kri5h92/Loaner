import keyMirror from 'fbjs/lib/keyMirror';

/**
 * Redux Actions Types
 */
export const actionTypes = Object.freeze(
  keyMirror({
    SET_ERRORS: undefined,
    PURGE_ERRORS: undefined,

    SIGNUP_USER: undefined,
    SIGNUP_USER_REQUEST: undefined,
    SIGNUP_USER_SUCCESS: undefined,
    SIGNUP_USER_FAILURE: undefined,

    LOGIN_USER: undefined,
    LOGIN_USER_REQUEST: undefined,
    LOGIN_USER_SUCCESS: undefined,
    LOGIN_USER_FAILURE: undefined,

    LOGOUT_USER: undefined,
    SET_CURRENT_USER: undefined,
    UNSET_CURRENT_USER: undefined
  })
);

/**
 *  USER
 */
export const USER_ROLES = Object.freeze(
  keyMirror({
    CUSTOMER: undefined,
    AGENT: undefined,
    ADMIN: undefined
  })
);

/**
 * Miscellaneous
 */
export const APP_NAME = 'KREDITPAY';
export const ACCESS_TOKEN = 'access_token';
export const SUBMIT_BTN_TYPE = Object.freeze({
  SAVE: '0',
  SAVE_AND_ADD: '1'
});

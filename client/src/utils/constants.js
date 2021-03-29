export const APP_NAME = 'KREDITPAY';
export const ACCESS_TOKEN = 'access_token';

export const FORM_ERROR_MESSAGES = Object.freeze({
  required: 'This field is required',
  isEmail: 'You have to type valid email',
  minLength: (fieldName, length) =>
    `You should have ${fieldName} atleast ${length} charaters long`,
  maxLength: (fieldName, length) =>
    `You can have ${fieldName} atmost ${length} characters long`,
  equalsTo: (fieldName) => `This field should match with ${fieldName}`,
  passwordMatch: `Passwords should match`
});

export const SUBMIT_BTN_TYPE = Object.freeze({
  SAVE: '0',
  SAVE_AND_ADD: '1'
});

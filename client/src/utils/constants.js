export const APP_NAME = 'KREDITPAY';
export const ACCESS_TOKEN = 'access_token';
export const API_LOCATION = 'http://localhost:3000';

export const FORM_ERROR_MESSAGES = {
  required: 'This field is required',
  isEmail: 'You have to type valid email',
  minLength: (fieldName, length) =>
    `You should have ${fieldName} atleast ${length} charaters long`,
  maxLength: (fieldName, length) =>
    `You can have ${fieldName} atmost ${length} characters long`,
  equalsTo: (fieldName) => `This field should match with ${fieldName}`,
  passwordMatch: `Passwords should match`
};

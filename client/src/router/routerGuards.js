import { appLocalStorage } from '../utils/storage';
import { ACCESS_TOKEN } from '../utils/constants';

export default {
  mustBeAuthorized: () => {
    const token = appLocalStorage.getItem(ACCESS_TOKEN);
    return !!token;
  },
  mustBeUnAuthorized: () => {
    const token = appLocalStorage.getItem(ACCESS_TOKEN);
    return !token;
  }
};

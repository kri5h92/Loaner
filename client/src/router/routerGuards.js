import {appSessionStorage} from '../utils/storage/sessionStorage';
import {ACCESS_TOKEN} from '../utils/constants';

export default{
    mustBeAuthorized: () => {
        const token = appSessionStorage.getItem(ACCESS_TOKEN);
        return !!token;        
    },
    mustBeUnAuthorized: () => {
        const token = appSessionStorage.getItem(ACCESS_TOKEN);
        return !token;
    }
}

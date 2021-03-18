import axios from 'axios';
import { handleResponse, handleError } from './response';
import { API_LOCATION } from '../../../utils/constants';

axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.headers.language = 'en';
axios.defaults.baseURL = API_LOCATION;

const getSingle = (resource, id) =>
  axios.get(`${API_LOCATION}/${resource}/${id}`).then(handleResponse).catch(handleError);

const getAll = (resource) =>
  axios.get(`${API_LOCATION}/${resource}`).then(handleResponse).catch(handleError);

const post = (resource, model) =>
  axios
    .post(`${API_LOCATION}/${resource}`, model)
    .then(handleResponse)
    .catch(handleError);

const put = (resource, id, model) =>
  axios
    .put(`${API_LOCATION}/${resource}/${id}`, model)
    .then(handleResponse)
    .catch(handleError);

const patch = (resource, model) =>
  axios
    .patch(`${API_LOCATION}/${resource}`, model)
    .then(handleResponse)
    .catch(handleError);

const remove = (resource, id) =>
  axios
    .delete(`${API_LOCATION}/${resource}/${id}`)
    .then(handleResponse)
    .catch(handleError);

export const apiProvider = {
  getAll,
  getSingle,
  post,
  put,
  patch,
  remove
};

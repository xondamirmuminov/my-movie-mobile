import Axios from 'axios';
import keys from '../configs';
import store from '../store';
import {loading} from '../store/Loading/actions';

const baseURL = keys.BACKEND_API;

const axios = Axios.create({baseURL, withCredentials: true, timeout: 20000});

export function sendQuery(url) {
  return Axios.get(
    'https://api.themoviedb.org/3/' + url + `?api_key=${keys.API_KEY}`,
  )
    .then(res => {
      return res.data;
    })
    .catch(err => err);
}

export function sendQueryPost(url) {
  return Axios.post(
    'https://api.themoviedb.org/3/' + url + `?api_key=${keys.API_KEY}`,
  )
    .then(res => {
      return res.data;
    })
    .catch(err => err);
}

axios.interceptors.request.use(configs => {
  store.dispatch(loading(true));
  return configs;
});

axios.interceptors.response.use(
  res => {
    store.dispatch(loading(false));
    return res;
  },
  error => {
    store.dispatch(loading(false));
    return Promise.reject(error);
  },
);

Axios.interceptors.request.use(configs => {
  store.dispatch(loading(true));
  return configs;
});

Axios.interceptors.response.use(
  res => {
    store.dispatch(loading(false));
    return res;
  },
  error => {
    store.dispatch(loading(false));
    return Promise.reject(error);
  },
);
export default axios;

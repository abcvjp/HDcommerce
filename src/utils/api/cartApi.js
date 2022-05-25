import { cleanObj, convertObjToQuery } from '../utilFuncs';
import API from './apiClient';

const cartApi = {
  checkValid: (data) => {
    const url = '/cart/check-valid';
    return API.post(url, cleanObj(data));
  },
  updateCart: (data) => {
    const url = '/cart';
    return API.put(url, cleanObj(data));
  },
  searchProducts: (query) => {
    const url = '/search';
    return API.get(url + convertObjToQuery(cleanObj(query)));
  }
};

export default cartApi;

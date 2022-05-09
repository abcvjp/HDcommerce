import { cleanObj, convertObjToQuery } from '../utilFuncs';
import API from './apiClient';

const productApi = {
  getAll: (query) => {
    const url = '/product/all';
    return API.get(url + convertObjToQuery(cleanObj(query)));
  },
  getProduct: (query) => {
    const url = '/product';
    return API.get(url + convertObjToQuery(cleanObj(query)));
  },
  deleteProduct: (id) => API.delete(`/product/${id}`),
  deleteProducts: (productIds) => API.delete('/product', {
    data: { productIds }
  }),
  createProduct: (data) => {
    const url = '/product';
    return API.post(url, cleanObj(data));
  },
  updateProduct: (id, data) => {
    const url = `/product/${id}`;
    return API.put(url, cleanObj(data));
  },
  editProduct: (id, body) => API.put(`/product/${id}`, body),
  searchProducts: (query) => {
    const url = '/search';
    return API.get(url + convertObjToQuery(cleanObj(query)));
  }
};

export default productApi;

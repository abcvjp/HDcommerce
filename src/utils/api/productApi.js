import { cleanObj, convertObjToQuery } from '../utilFuncs';
import API from './apiClient';

const productApi = {
  getAll: (query) => {
    const url = '/product';
    return API.get(url + convertObjToQuery(cleanObj({ ...query, isPublic: true, isEnabled: true })));
  },
  getProduct: (query) => {
    const url = '/product';
    return API.get(url + convertObjToQuery(cleanObj({ ...query, isPublic: true, isEnabled: true })));
  },
  getHotProduct: (query) => {
    const url = '/product/hot';
    return API.get(url + convertObjToQuery(cleanObj(query)));
  },
  getProductById: (id) => API.get(`/product/${id}`),
  getRelatedProducts: (id) => API.get(`/product/${id}/relate`),
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

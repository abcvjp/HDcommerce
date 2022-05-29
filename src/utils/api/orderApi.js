import { cleanObj, convertObjToQuery } from '../utilFuncs';
import API from './apiClient';

const orderApi = {
  createOrder: (data) => {
    const url = '/order';
    return API.post(url, cleanObj(data));
  },
  getShippingMethods: () => API.get('/delivery-method'),
  getPaymentMethods: () => API.get('/payment-method'),
  getAll: (query) => {
    const url = '/order';
    return API.get(url + convertObjToQuery(cleanObj(query)));
  },
  cancelOrder: (id) => API.get(`/order/${id}/cancel`),
  getOrderById: (id) => API.get(`/order/${id}`)
};

export default orderApi;

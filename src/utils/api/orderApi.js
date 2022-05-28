import { cleanObj } from '../utilFuncs';
import API from './apiClient';

const orderApi = {
  createOrder: (data) => {
    const url = '/order';
    return API.post(url, cleanObj(data));
  },
  getShippingMethods: () => API.get('/delivery-method'),
  getPaymentMethods: () => API.get('/payment-method')
};

export default orderApi;

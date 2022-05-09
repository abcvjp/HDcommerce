import { cleanObj } from '../utilFuncs';
import API from './apiClient';

const orderApi = {
  createOrder: (data) => {
    const url = '/order';
    return API.post(url, cleanObj(data));
  },
  getShippingMethods: () => API.get('/shipping/shipping_method'),
  getPaymentMethods: () => API.get('/payment/payment_method')
};

export default orderApi;

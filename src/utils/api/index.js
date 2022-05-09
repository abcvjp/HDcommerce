import categoryApi from './categoryApi';
import productApi from './productApi';
import orderApi from './orderApi';
import userApi from './userApi';

const API = {
  CATEGORY: categoryApi,
  PRODUCT: productApi,
  ORDER: orderApi,
  USER: userApi
};

export default API;
export {
  categoryApi,
  productApi,
  orderApi,
  userApi
};

import API from './apiClient';
import { cleanObj } from '../utilFuncs';

const categoryApi = {
  getAll: (body) => API.get('/category/all', body),
  deleteCategory: (id) => API.delete(`/category/${id}`),
  deleteCategories: (categoryIds) => API.delete('/category', {
    data: { categoryIds }
  }),
  createCategory: (data) => {
    const url = '/category';
    return API.post(url, cleanObj(data));
  },
  editCategory: (id, body) => API.put(`/category/${id}`, body),
  updateCategory: (id, data) => {
    const url = `/category/${id}`;
    return API.put(url, cleanObj(data));
  },
};

export default categoryApi;

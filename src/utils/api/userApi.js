import API from './apiClient';
import { cleanObj } from '../utilFuncs';

const categoryApi = {
  login: (data) => API.post('/user/login', data),
  logout: () => API.get('user/logout'),
  signup: (data) => API.post('/user/signup', cleanObj(data)),
  getUser: (id) => API.get(`/user/${id}`),
  getUsers: () => API.get('/user')
};

export default categoryApi;

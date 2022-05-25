import API from './apiClient';
import { cleanObj } from '../utilFuncs';

const userApi = {
  login: (data) => API.post('/auth/login', data),
  logout: () => API.post('/auth/logout'),
  signup: (data) => API.post('/user/signup', cleanObj(data)),
  getUser: (id) => API.get(`/user/${id}`),
  getUsers: () => API.get('/user')
};

export default userApi;

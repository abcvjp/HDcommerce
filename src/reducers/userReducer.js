import { SET_USER } from 'src/constants/actionTypes';

const initialState = null;

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER: {
      const { user } = action.payload;
      window.localStorage.setItem('user', JSON.stringify(user));
      return user;
    }
    default:
      return state;
  }
}

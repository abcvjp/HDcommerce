import { SET_USER } from 'src/constants/actionTypes';
import { initialCartState } from 'src/reducers/cartReducers';
import { userApi } from 'src/utils/api';
import { showAlertMessage } from './alertMessageActions';
import { setCart } from './cartActions';

export const setUser = (user) => ({
  type: SET_USER,
  payload: {
    user
  }
});

export const logout = () => async (dispatch) => {
  try {
    await userApi.logout();
    localStorage.removeItem('access_token');
    dispatch(setUser(null));
    dispatch(setCart({
      cart: initialCartState
    }));
  } catch (error) {
    dispatch(showAlertMessage({ type: 'error', content: 'Error while logging out' }));
  }
};

import { initialCartState } from 'src/reducers/cartReducers';
import { userApi } from 'src/utils/api';
import { showAlertMessage } from './alertMessageActions';
import { setCart, setUser } from './cartActions';

export const logout = () => async (dispatch) => { // eslint-disable-line
  try {
    await userApi.logout();
    dispatch(setUser(null));
    dispatch(setCart(initialCartState));
  } catch (error) {
    dispatch(showAlertMessage({ type: 'error', content: 'Error while logging out' }));
  }
};

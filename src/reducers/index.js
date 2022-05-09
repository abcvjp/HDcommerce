import { combineReducers } from 'redux';
import cartReducer from './cartReducers';
import categoryReducer from './categoryReducer';

import alertMessageReducer from './alertMessageReducer';
import confirmDialogReducer from './confirmDialogReducer';
import fullscreenLoadingReducer from './fullscreenLoading';

export default combineReducers({
  categories: categoryReducer,
  cart: cartReducer,
  ui: combineReducers({
    alertMessage: alertMessageReducer,
    confirmDialog: confirmDialogReducer,
    fullscreenLoading: fullscreenLoadingReducer
  })
});

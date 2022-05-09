import { OPEN_FULL_SCREEN_LOADING, CLOSE_FULL_SCREEN_LOADING } from 'src/constants/actionTypes';

const initialState = {
  isShown: false
};

export default function fullscreenLoadingReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_FULL_SCREEN_LOADING:
      return {
        isShown: true,
      };
    case CLOSE_FULL_SCREEN_LOADING:
      return initialState;
    default:
      return state;
  }
}

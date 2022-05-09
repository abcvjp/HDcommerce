import { SHOW_ALERT_MESSAGE, CLOSE_ALERT_MESSAGE } from '../constants/actionTypes';

const initialState = {
  alertMessage: {
    isShown: false,
    type: null,
    content: null
  }
};

export default function messageReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_ALERT_MESSAGE:
      return {
        isShown: true,
        type: action.payload.type,
        content: action.payload.content
      };
    case CLOSE_ALERT_MESSAGE:
      return initialState;
    default:
      return state;
  }
}

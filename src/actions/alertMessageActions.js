import { SHOW_ALERT_MESSAGE, CLOSE_ALERT_MESSAGE } from '../constants/actionTypes';

export const showAlertMessage = ({ type, content }) => ({
  type: SHOW_ALERT_MESSAGE,
  // type: warning, error, infomation, success
  payload: {
    type, content
  }
});

export const closeAlertMessage = () => ({
  type: CLOSE_ALERT_MESSAGE
});

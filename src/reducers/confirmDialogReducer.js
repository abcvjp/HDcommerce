import { OPEN_CONFIRM_DIALOG, CLOSE_CONFIRM_DIALOG } from '../constants/actionTypes';

const initialState = {
  confirmDialog: {
    isOpen: false,
    message: '',
    onConfirm: () => {},
    onCancel: () => {}
  }
};

export default function confirmDialogReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_CONFIRM_DIALOG:
      return {
        isOpen: true,
        message: action.payload.message,
        onConfirm: action.payload.onConfirm,
        onCancel: action.payload.onCancel
      };
    case CLOSE_CONFIRM_DIALOG:
      return {
        isOpen: false,
        message: '',
        onConfirm: () => {},
        onCancel: () => {},
      };
    default:
      return state;
  }
}

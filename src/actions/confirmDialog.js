import { OPEN_CONFIRM_DIALOG, CLOSE_CONFIRM_DIALOG } from 'src/constants/actionTypes';

export const openConfirmDialog = ({ message, onConfirm, onCancel }) => ({
  type: OPEN_CONFIRM_DIALOG,
  payload: {
    message,
    onConfirm,
    onCancel
  }
});

export const closeConfirmDialog = () => ({
  type: CLOSE_CONFIRM_DIALOG,
  payload: null
});

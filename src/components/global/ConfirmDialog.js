import { useSelector, useDispatch } from 'react-redux';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Box,
  Typography
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { closeConfirmDialog } from '../../actions/confirmDialog';

const ConfirmDialog = () => {
  const dispatch = useDispatch();
  const {
    isOpen, message, onConfirm, onCancel
  } = useSelector((state) => state.ui.confirmDialog);
  const handleDialogSubmit = () => {
    if (onConfirm) {
      onConfirm();
    }
    dispatch(closeConfirmDialog());
  };
  const handleDialogCancel = () => {
    if (onCancel) {
      onCancel();
    }
    dispatch(closeConfirmDialog());
  };
  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        dispatch(closeConfirmDialog());
      }}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Confirm the action</DialogTitle>
      <Box position="absolute" top={0} right={0}>
        <IconButton onClick={() => {
          dispatch(closeConfirmDialog());
        }}
        >
          <Close />
        </IconButton>
      </Box>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained" onClick={handleDialogCancel}>
          Cancel
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={handleDialogSubmit}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;

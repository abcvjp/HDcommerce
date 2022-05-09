import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { closeAlertMessage } from 'src/actions/alertMessageActions';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AlertMessage = () => {
  const message = useSelector((state) => state.ui.alertMessage);
  const dispatch = useDispatch();
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(closeAlertMessage());
  };
  return (
    <Snackbar
      open={message.isShown}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={message.type}>
        {message.content}
      </Alert>
    </Snackbar>
  );
};

export default AlertMessage;

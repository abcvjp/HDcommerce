import {
  Dialog, DialogActions, DialogContent, DialogContentText, Button, DialogTitle, Typography
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

/* eslint-disable react/prop-types */

const ErrorDialog = ({ error }) => {
  const navigate = useNavigate();
  const handleBackToCart = () => {
    navigate('/cart');
  };
  const handleCheckAgain = () => {
    navigate('/checkout', { replace: true });
  };
  return (
    <Dialog
      open
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <Typography style={{ fontWeight: 'bold', color: 'red' }}>Order Failed</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {error}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleBackToCart} color="secondary" variant="contained">
          Back To Cart
        </Button>
        <Button onClick={handleCheckAgain} color="primary" variant="contained">
          Check again
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorDialog;

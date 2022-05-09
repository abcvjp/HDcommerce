import {
  Dialog, DialogActions, DialogContent, DialogContentText, Button
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

/* eslint-disable react/prop-types */

const SuccessDialog = ({ order }) => {
  const navigate = useNavigate();
  const handleSuccessDialogClose = () => {
    navigate('/');
  };
  return (
    <Dialog open>
      <DialogContent>
        <DialogContentText style={{ fontWeight: 'bold', color: 'green' }}>Ordered successfully</DialogContentText>
        <DialogContentText>
          {`Your order id is ${order.id}. We'll email you an order confirmation with details and tracking info.`}
        </DialogContentText>
        <DialogActions>
          <Button onClick={handleSuccessDialogClose} color="secondary" size="large" variant="contained">
            CONTINUE SHOPPING
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessDialog;

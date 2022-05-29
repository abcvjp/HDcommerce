import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles, Paper, Typography,
} from '@material-ui/core';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { openConfirmDialog } from 'src/actions/confirmDialog';
import theme from 'src/theme';
import { orderApi } from 'src/utils/api';

const useStyles = makeStyles(() => ({
  order: {
    marginBlock: theme.spacing(2),
    padding: theme.spacing(2)
  },
  orderHead: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2)
  },
  orderTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing(2)
  }
}));

/* eslint-disable react/prop-types */

const statusColor = {
  Creating: 'orange',
  Pending: 'orange',
  Handling: 'blue',
  Completed: 'green',
  Canceled: 'red',
  Failed: 'red'
};

const OrderCard = ({ order }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [status, setStatus] = useState(order.status);

  const handleCancelOrder = (orderId) => () => dispatch(openConfirmDialog({
    message: 'Are you sure want to cancel this order?',
    onConfirm: async () => {
      try {
        await orderApi.cancelOrder(orderId);
        setStatus('Canceled');
      } catch (error) {
        if (error.response) {
        // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
        // The request was made but no response was received
          console.log(error.request);
        } else {
        // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
      }
    }
  }));

  return (
    <Paper elevation={0} className={classes.order}>
      <Box className={classes.orderHead}>
        <Typography variant="subtitle2">{order.code}</Typography>
        <Box>
          <Typography
            variant="subtitle1"
            style={{ color: order.paymentStatus === 'Paid' ? 'green' : 'red' }}
            display="inline"
          >
            {order.paymentStatus}
          </Typography>
          {'  |  '}
          <Typography
            variant="subtitle1"
            style={{ color: statusColor[order.status] }}
            display="inline"
          >
            {status}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <List>
        {order.items.map((item) => (
          <ListItem>
            <ListItemAvatar>
              <Avatar src={item.productThumbnail} variant="square" />
            </ListItemAvatar>
            <ListItemText primary={item.productName} secondary={`Qty: ${item.quantity} - Price: $${item.price}`} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box className={classes.orderTotal}>
        <Box>
          {['Pending', 'Handling'].includes(status) && (
          <Button variant="contained" onClick={handleCancelOrder(order._id)}>
            Cancel
          </Button>
          )}
          <Button variant="contained" style={{ marginLeft: 16 }} href={`/order/${order._id}`}>
            View Detail
          </Button>
        </Box>
        <Typography>
          Total:
          {' '}
          {`$${order.orderTotal}`}
        </Typography>
      </Box>
    </Paper>
  );
};

export default OrderCard;

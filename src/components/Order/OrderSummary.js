import { useState, memo } from 'react';
import {
  Grid, makeStyles, Box, Divider, Typography, Collapse, List, ListItem, ListItemText, ListItemAvatar, Avatar
} from '@material-ui/core';

import { grey } from '@material-ui/core/colors';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import shortid from 'shortid';
import { caculateTotalPrice } from 'src/utils/utilFuncs';

/* eslint-disable react/prop-types */

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: grey[200]
  },
  title: {
    marginBottom: theme.spacing(2)
  },
  margin: {
    marginBlock: theme.spacing(2)
  },
  total: {
    fontWeight: 'bold',
    fontSize: 'large',
    color: 'red'
  },
  checkout: {
    fontWeight: 'bold'
  }
}));

const OrderSummary = ({ orderItems = [], shippingMethod, paymentMethod }) => {
  const classes = useStyles();
  const [openCartDetail, setOpenCartDetail] = useState(false);

  const subtotal = orderItems.length > 0 ? caculateTotalPrice(orderItems) : 0;
  const shippingFee = shippingMethod ? shippingMethod.fee : 0;

  const handleClickCartDetail = () => {
    setOpenCartDetail(!openCartDetail);
  };
  return (
    <Grid className={classes.root} container direction="column" justifyContent="flex-start" spacing={2}>

      <Grid key="title" item>
        <Typography className={classes.title} variant="h6">Summary</Typography>
        <Divider variant="fullWidth" />
      </Grid>

      <Grid key="subtotal" item>
        <Box display="flex" justifyContent="space-between">
          <Typography>Subtotal</Typography>
          <Typography>
            $
            {subtotal}
          </Typography>
        </Box>
      </Grid>

      <Grid key="discount" item>
        <Box display="flex" justifyContent="space-between">
          <Typography>Discount</Typography>
          <Typography>
            $
            {0}
          </Typography>
        </Box>
      </Grid>

      {shippingMethod && (
      <Grid key="shippingMethod" item>
        <Box display="flex" justifyContent="space-between">
          <Typography>
            Ship:
            {' '}
            {shippingMethod.name}
          </Typography>
          <Typography>
            $
            {shippingFee}
          </Typography>
        </Box>
      </Grid>
      )}

      {paymentMethod && (
      <Grid key="paymentMethod" item>
        <Box display="flex" justifyContent="space-between">
          <Typography>Payment method</Typography>
          <Typography>{paymentMethod.name}</Typography>
        </Box>
      </Grid>
      )}

      <Grid key="divider 1" item>
        <Divider variant="fullWidth" />
      </Grid>

      <Grid key="total" item>
        <Box display="flex" justifyContent="space-between">
          <Typography>Order Total</Typography>
          <Typography className={classes.total}>
            $
            {subtotal + shippingFee}
          </Typography>
        </Box>
      </Grid>

      <Grid key="orderItems" item>
        <div id="order-item-list">
          <ListItem button onClick={handleClickCartDetail}>
            <ListItemText primary={`${orderItems.length} item to buy`} />
            {openCartDetail ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Divider />
          <Collapse in={openCartDetail} timeout="auto" unmountOnExit>
            <List disablePadding dense>
              {orderItems.map((item) => (
                <ListItem key={shortid.generate()} button>
                  <ListItemAvatar>
                    <Avatar src={item.product_thumbnail.url} />
                  </ListItemAvatar>
                  <ListItemText primary={item.product_name} secondary={`Price: ${item.price}\nQty: ${item.quantity}`} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </div>
      </Grid>

    </Grid>
  );
};

export default memo(OrderSummary, (prevProps, nextProps) => (prevProps.shippingMethod === nextProps.shippingMethod && prevProps.paymentMethod === nextProps.paymentMethod));

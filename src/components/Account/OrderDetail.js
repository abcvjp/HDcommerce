import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Paper, Typography, Divider, Table, TableBody, TableCell, TableContainer, TableRow, makeStyles,
} from '@material-ui/core';

import StatusLabel from '../StatusLabel';
import OrderItemList from './OrderItemList';

const useStyles = makeStyles(() => ({
  status: {
    marginBottom: 16
  },
  title: {
    padding: 16
  }
}));
const OrderDetail = ({ order }) => {
  const classes = useStyles();
  const createInfoField = (field, value) => ({ field, value });

  const orderStatus = [
    createInfoField('Status', order.status),
    createInfoField('Payment Status', order.paymentStatus),
    createInfoField('Shipping Status', order.deliveryStatus)
  ];
  const orderInfo = [
    createInfoField('Order ID', order._id),
    createInfoField('Order code', order.code),
    createInfoField('User ID', order.userId),
    createInfoField('Created at', (new Date(order.createdAt)).toLocaleString('en-us')),
    createInfoField('Last update', (new Date(order.updatedAt)).toLocaleString('en-us')),
    createInfoField('Order total', `$${order.orderTotal}`),
    createInfoField('Item total', `$${order.itemTotal}`),
    createInfoField('Shipping fee', `$${order.deliveryFee}`),
    createInfoField('Customer name', order.customerInfo.name),
    createInfoField('Email', order.customerInfo.email),
    createInfoField('Phone number', order.customerInfo.phoneNumber),
    // createInfoField('Payment method', order.paymentMethod.name),
    // createInfoField('Shipping method', order.shippingMethod.name),
    createInfoField('Shipping address', order.customerInfo.address),
    // createInfoField('Shipping note', order.shippingNote)
  ];

  return (
    <Grid container justifyContent="flex-start" spacing={2}>
      <Grid item xs={12} sm={6}>
        <Paper className={classes.status}>
          <Typography className={classes.title} variant="h6">Order Status</Typography>
          <Divider />
          <TableContainer>
            <Table>
              <TableBody>
                {orderStatus.map((row) => (
                  <TableRow key={row.field} hover>
                    <TableCell align="left">
                      <b>{row.field}</b>
                    </TableCell>
                    <TableCell align="left">
                      <StatusLabel status={row.value} size="small" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Paper>
          <Typography className={classes.title} variant="h6">Order Items</Typography>
          <Divider />
          <OrderItemList items={order.items} />
        </Paper>
      </Grid>
      <Grid item sm={6}>
        <Paper>
          <Typography className={classes.title} variant="h6">Order Info</Typography>
          <Divider />
          <TableContainer>
            <Table>
              <TableBody>
                {orderInfo.map((row) => (
                  <TableRow key={row.field} hover>
                    <TableCell align="left">
                      <b>{row.field}</b>
                    </TableCell>
                    <TableCell align="left">{row.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};

OrderDetail.propTypes = {
  order: PropTypes.object.isRequired
};

export default OrderDetail;

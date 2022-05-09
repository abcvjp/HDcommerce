import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Helmet } from 'react-helmet';

import {
  Grid, makeStyles, Typography,
} from '@material-ui/core';

import { checkItemsValid, checkCartValidAndUpdate } from 'src/actions/cartActions';

import { closeFullScreenLoading, openFullScreenLoading } from 'src/actions/fullscreenLoading';
import { caculateTotalPrice } from 'src/utils/utilFuncs';
import { showAlertMessage } from 'src/actions/alertMessageActions';

import CartDetail from 'src/components/Cart/CartDetail';
import CartSummary from 'src/components/Cart/CartSummary';
import { APP_TITLE } from 'src/constants/appInfo';

const useStyles = makeStyles((theme) => ({
  root: {

  },
  title: {
    marginBlock: theme.spacing(3),
  },
  detail: {
    flexGrow: 1,
  },
  summary: {
    flexGrow: 1,
    flexShrink: 1,
  },

  margin: {
    margin: theme.spacing(1.5),
  },
}));

const CartPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart); // eslint-disable-line
  const selectedItems = cartItems.filter((item) => item.isSelected === true);

  const handleProceedToCheckout = () => {
    if (selectedItems.length > 0) {
      dispatch(openFullScreenLoading());
      dispatch(checkItemsValid({
        items: selectedItems,
        onSuccess: () => {
          navigate('/checkout', {
            state: {
              pathname: '/checkout',
              orderItems: selectedItems,
            }
          });
        },
        onFailed: () => {
          dispatch(showAlertMessage({ type: 'warning', content: 'Something wrong with your cart, you should check again' }));
        }
      }));
      dispatch(closeFullScreenLoading());
    } else {
      dispatch(showAlertMessage({ type: 'warning', content: 'You must select items to order' }));
    }
  };

  useEffect(() => {
    dispatch(openFullScreenLoading());
    dispatch(checkCartValidAndUpdate());
    dispatch(closeFullScreenLoading());
  }, []);

  const subtotal = caculateTotalPrice(selectedItems);

  return (
    <div className={classes.root}>

      <Helmet>
        <title>
          Cart |
          {' '}
          {APP_TITLE}
        </title>
      </Helmet>

      <Typography variant="h5" className={classes.title}>Shopping Cart</Typography>
      {cartItems.length > 0
        ? (
          <>
            <Grid container className={classes.main} alignItems="flex-start" justifyContent="space-between" spacing={2}>
              <Grid item xs={12} md={9} key="cart_detail" className={classes.detail}>
                <CartDetail
                  cartItems={cartItems}
                />
              </Grid>
              <Grid item md={3} key="cart_summary" className={classes.summary}>
                <CartSummary
                  subtotal={subtotal}
                  handleProceedToCheckout={handleProceedToCheckout}
                />
              </Grid>
            </Grid>
          </>
        )
        : <Typography>Your cart is empty, let buy some product!</Typography>}

    </div>
  );
};

export default CartPage;

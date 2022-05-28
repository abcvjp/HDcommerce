import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Helmet } from 'react-helmet';

import {
  Container,
  Grid, makeStyles, Typography,
} from '@material-ui/core';

import { checkItemsValid } from 'src/actions/cartActions';

import { closeFullScreenLoading, openFullScreenLoading } from 'src/actions/fullscreenLoading';
import { showAlertMessage } from 'src/actions/alertMessageActions';

import CartDetail from 'src/components/Cart/CartDetail';
import CartSummary from 'src/components/Cart/CartSummary';
import { APP_TITLE } from 'src/constants/appInfo';
import { caculateCartPrice } from 'src/utils/utilFuncs';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '80%'
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

  const cart = useSelector((state) => state.cart);
  const selectedItems = cart.items.filter((item) => item.selected === true);
  const subTotal = caculateCartPrice(cart.items);

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

  return (
    <Container maxWidth="lg" className={classes.root}>

      <Helmet>
        <title>
          Cart |
          {' '}
          {APP_TITLE}
        </title>
      </Helmet>

      <Typography variant="h5" className={classes.title}>Shopping Cart</Typography>
      {cart.items.length > 0
        ? (
          <>
            <Grid container className={classes.main} alignItems="flex-start" justifyContent="space-between" spacing={2}>
              <Grid item xs={12} md={9} key="cart_detail" className={classes.detail}>
                <CartDetail
                  cartItems={cart.items}
                  messages={cart.messages}
                />
              </Grid>
              <Grid item md={3} key="cart_summary" className={classes.summary}>
                <CartSummary
                  subtotal={subTotal}
                  handleProceedToCheckout={handleProceedToCheckout}
                />
              </Grid>
            </Grid>
          </>
        )
        : <Typography>Your cart is empty, let buy some product!</Typography>}

    </Container>
  );
};

export default CartPage;

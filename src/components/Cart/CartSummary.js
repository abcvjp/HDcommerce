import {
  Box, Paper, Divider, Typography,
  makeStyles
} from '@material-ui/core';
import ContainedButton from '../styled-material/ContainedButton';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
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

/* eslint-disable react/prop-types */

const CartSummary = ({ subtotal, discount = 0, handleProceedToCheckout }) => {
  const classes = useStyles();
  return (
    <Paper
      elevation={0}
      className={classes.root}
    >
      <Box mb={2}>
        <Typography variant="h6">Summary</Typography>
      </Box>

      <Divider key="divider_1" variant="fullWidth" />

      <Box className={classes.margin} display="flex" justifyContent="space-between">
        <Typography>Subtotal</Typography>
        <Typography>
          $
          {subtotal}
        </Typography>
      </Box>

      <Box className={classes.margin} display="flex" justifyContent="space-between">
        <Typography>Discount</Typography>
        <Typography>
          $
          {discount}
        </Typography>
      </Box>

      <Divider key="divider_2" variant="fullWidth" />

      <Box className={classes.margin} display="flex" justifyContent="space-between">
        <Typography>Order Total</Typography>
        <Typography className={classes.total}>
          $
          {discount + subtotal}
        </Typography>
      </Box>

      <ContainedButton
        className={classes.checkout}
        id="checkout-button"
        size="large"
        fullWidth
        onClick={handleProceedToCheckout}
      >
        Proceed To Checkout
      </ContainedButton>

    </Paper>
  );
};

export default CartSummary;

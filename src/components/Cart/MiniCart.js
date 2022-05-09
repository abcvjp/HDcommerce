import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  makeStyles, Popover, Typography, Box
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ContainedButton from '../styled-material/ContainedButton';
import MiniCartDetail from './MiniCartDetail';

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none'
  },
  paper: {
    pointerEvents: 'auto',
    padding: theme.spacing(1)
  },
  checkOut: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    color: 'white',
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main
    }
  }
}));

const MiniCart = () => {
  const classes = useStyles();
  const cart_items = useSelector((state) => state.cart);
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const itemCount = cart_items.reduce((accumul, cur) => (accumul + cur.quantity), 0);

  return (
    <div
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
      id="mini-cart"
    >
      <IconButton
        color="inherit"
        size="medium"
        component={RouterLink}
        to="/cart"
      >
        <Badge
          badgeContent={itemCount}
          color="error"
        >
          <div style={{ fontSize: '2rem' }}>

            <ShoppingCartIcon fontSize="inherit" />
          </div>
        </Badge>
      </IconButton>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        animation="false"
        disableRestoreFocus
        onClose={handlePopoverClose}
      >
        {itemCount > 0
          ? (
            <>
              <MiniCartDetail cart_items={cart_items} />
              <ContainedButton
                href="/cart"
                fullWidth
              >
                VIEW CART & CHECK OUT
              </ContainedButton>

            </>
          )
          : <Box m={1}><Typography>Your cart is current empty</Typography></Box>}
      </Popover>
    </div>
  );
};

export default MiniCart;

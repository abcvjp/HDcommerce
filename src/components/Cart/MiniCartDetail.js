import { useCallback } from 'react';

import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import shortid from 'shortid';
import { openConfirmDialog } from 'src/actions/confirmDialog';
import { deleteItemCart } from 'src/actions/cartActions';
import MiniCartItem from './MiniCartItem';

/* eslint-disable react/prop-types */

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  subTotal: {
    margin: theme.spacing(2)
  }
}));

const MiniCartDetail = ({ cart_items }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const deleteItem = useCallback((itemIndex) => () => dispatch(openConfirmDialog({
    message: 'Are you sure want to delete item from your cart?',
    onConfirm: () => dispatch(deleteItemCart({ itemIndex }))
  })));

  return (
    <div id="mini-cart-detail">
      <List className={classes.root} disablePadding dense>
        {cart_items.map((item, itemIndex) => (
          <MiniCartItem
            key={shortid.generate()}
            item={item}
            deleteItem={deleteItem(itemIndex)}
          />
        ))}
      </List>
    </div>
  );
};

export default MiniCartDetail;

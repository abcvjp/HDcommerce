import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { Delete } from '@material-ui/icons';
import {
  IconButton, ListItemSecondaryAction, makeStyles, Link
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';

/* eslint-disable react/prop-types */

const useStyles = makeStyles(() => ({
  textField: {
    maxWidth: 80
  },
  itemText: {
    maxWidth: 300
  },
  deleteButton: {
    '&:hover': {
      background: 'none',
    }
  }
}));
const MiniCartItem = ({ item, deleteItem }) => {
  const classes = useStyles();
  return (
    <div id="mini-cart-item">
      <ListItem button>
        <ListItemAvatar>
          <Avatar
            variant="square"
            src={item.product_thumbnail.url}
          />
        </ListItemAvatar>
        <ListItemText
          className={classes.itemText}
          primary={(
            <Link
              to={`/product/${item.product_slug}`}
              component={RouterLink}
            >
              {item.product_name}
            </Link>
          )}
          secondary={`${item.price}$ - Qty: ${item.quantity}`}
        />
        <ListItemSecondaryAction>
          <IconButton
            className={classes.deleteButton}
            edge="end"
            disableRipple
            disableFocusRipple
            disableTouchRipple
            onClick={deleteItem}
          >
            <Delete />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </div>
  );
};

export default MiniCartItem;

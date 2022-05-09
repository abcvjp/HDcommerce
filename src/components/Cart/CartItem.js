import {
  Avatar, IconButton, makeStyles, TextField, Box, Checkbox,
  Grid,
  Link,
  Typography
} from '@material-ui/core';

import { Link as RouterLink } from 'react-router-dom';

import { Delete } from '@material-ui/icons';
import { roundPrice } from 'src/utils/utilFuncs';

import shortid from 'shortid';

/* eslint-disable react/prop-types */

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'nowrap',
    [theme.breakpoints.down('xs')]: {
      flexWrap: 'wrap'
    },
    padding: theme.spacing(1)
  },
  name: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  productName: {
    alignSelf: 'flex-start',
    flexGrow: 1,
    maxWidth: theme.spacing(30)
  },
  metrics: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexWrap: 'nowrap',
  },
  metricItem: {
    width: '25%',
    display: 'flex',
    justifyContent: 'center'
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  qtyfield: {
    maxWidth: theme.spacing(10)
  },
  delete: {
    color: 'grey'
  },
  errors: {
    display: 'flex',
    flexDirection: 'row-reverse',
  }
}));

const CartItem = ({
  item, handleChangeQtyItem, handleDeleteItem, handleSelectItemChange
}) => {
  const classes = useStyles();
  return (
    <>
      <Grid className={classes.root} container item>

        <Grid key="item" className={`${classes.name}`} item container xs={12} sm={7} spacing={2}>
          <Grid key="select" item>
            <Checkbox
              disableRipple
              checked={item.isSelected}
              onChange={handleSelectItemChange}
              disabled={!item.buy_able}
            />
          </Grid>

          <Grid item key="thumbnail">
            <Avatar
              className={classes.avatar}
              src={item.product_thumbnail.url}
              alt={item.product_name}
              variant="square"
            />
          </Grid>

          <Grid item key="item_name" className={classes.productName}>
            <Link
              component={RouterLink}
              to={`/product/${item.product_slug}`}
            >
              {item.product_name}
            </Link>
          </Grid>
        </Grid>

        <Grid key="other" className={`${classes.metrics}`} item container sm={5}>
          <Grid key="price" item className={classes.metricItem}>
            {item.price}
          </Grid>

          <Grid key="quantity" item className={classes.metricItem}>
            <TextField
              className={classes.qtyfield}
              type="number"
              variant="outlined"
              margin="none"
              defaultValue={item.quantity}
              InputProps={{ inputProps: { min: 1, max: 999999999 } }}
              onChange={(e) => {
                if (parseInt(e.target.value, 10) > 999999999) {
                  e.target.value = 999999999;
                }
              }}
              onBlur={handleChangeQtyItem}
            />
          </Grid>

          <Grid key="subtotal" item className={classes.metricItem}>
            {roundPrice(item.price * item.quantity)}
          </Grid>

          <Grid key="delete" item className={classes.metricItem}>
            <IconButton
              className={classes.delete}
              disableFocusRipple
              disableRipple
              onClick={handleDeleteItem}
            >
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      {item.errors && (
      <Box key="errors" className={classes.errors}>
        {item.errors.map((err) => (
          <Box key={shortid.generate()} m={1}>
            <Typography
              variant="caption"
              color="error"
            >
              {err}
            </Typography>
          </Box>
        ))}
      </Box>
      )}
    </>
  );
};

export default CartItem;

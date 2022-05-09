import PropTypes from 'prop-types';
import {
  makeStyles, Typography, Box, Divider, Grid
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  margin: {
    marginBlock: theme.spacing(2)
  },
  sold: {
    color: theme.palette.grey.main
  },
  price: {
    fontSize: theme.spacing(4),
    fontWeight: 500,
    clear: 'both',
    color: 'red',
    marginRight: theme.spacing(1)
  },
  root_price: {
    textDecoration: 'line-through',
    fontSize: theme.spacing(4),
    verticalAlign: 'middle',
    color: theme.palette.grey.main
  },
  shortDes: {
    fontSize: theme.spacing(2),
    fontWeight: 400,
    clear: 'both'
  },
  qty: {
    width: theme.spacing(8),
    height: theme.spacing(6)
  },
  plus: {
    width: theme.spacing(8),
    height: theme.spacing(6)
  }
}));

const ProductDetail = ({ product }) => {
  const classes = useStyles();
  return (
    <Box>
      <Typography variant="h6">{product.title}</Typography>

      <Grid
        container
        justifyContent="flex-start"
        alignItems="center"
        spacing={1}
        style={{ marginBlock: 8 }}
      >
        <Grid item>
          <Rating size="medium" defaultValue={2.5} precision={0.5} readOnly />
        </Grid>
        <Divider flexItem orientation="vertical" variant="middle" />
        <Grid item>
          <Typography sx={{ fontSize: 24 }} className={classes.soldQuantity}>
            Sold
            {' '}
            {product.soldQuantity}
          </Typography>
        </Grid>
        <Divider flexItem orientation="vertical" variant="middle" />
        <Grid item>
          <Typography sx={{ fontSize: 24 }} className={classes.soldQuantity}>
            {`${product.stockQuantity} product left`}
          </Typography>
        </Grid>
      </Grid>

      <Box display="flex" direction="row" alignItems="center">
        <div className={classes.price}>
          $
          {product.price}
        </div>
        <div className={classes.root_price}>
          $
          {product.originalPrice}
        </div>
      </Box>

      <Box className={`${classes.margin} ${classes.shortDes}`}>
        <Typography variant="body2">{product.shortDescription}</Typography>
      </Box>
    </Box>
  );
};

ProductDetail.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductDetail;

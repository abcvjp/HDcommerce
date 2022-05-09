import { useState } from 'react';

import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Box, Link } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

import { Link as RouterLink } from 'react-router-dom';
import { checkAndAddToCart } from 'src/actions/cartActions';

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '&:hover': {
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
    },
    height: '100%'
  },
  media: {
    maxHeight: 300
  },
  content: {
    padding: theme.spacing(2)
  },
  sold: {
    color: theme.palette.grey.main
  },
  price: {
    fontWeight: 600
  },
  discount: {
    color: 'white',
    backgroundColor: 'red',
    padding: theme.spacing(0.3)
  },
  marginRight: {
    marginRight: theme.spacing(1)
  },
  addbutton: {
    fontWeight: 600,
    background: theme.palette.secondary.main,
    color: '#ffffff',
    border: 'solid 2px',
    borderColor: theme.palette.secondary.main,
    transition: 'all 0.5s ease-in-out 0s',
    '&:hover': {
      background: 'transparent',
      color: theme.palette.secondary.main,
    }
  }
}));

const ProductCard = ({ product }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    dispatch(checkAndAddToCart({
      product_id: product.id,
      product_name: product.name,
      product_slug: product.slug,
      price: product.price,
      quantity: 1
    }));
    setIsAdding(false);
  };

  const discount = 100 - Math.round((product.price / product.root_price) * 100);

  return (
    <Card className={classes.root}>
      <RouterLink to={`/product/${product.slug}`}>
        <CardMedia
          className={classes.media}
          component="img"
          image={product.images ? product.images[0].url : null}
          alt={product.images ? product.images[0].alt : null}
          title={product.images ? product.images[0].title : null}
        />
      </RouterLink>
      <CardContent className={classes.content}>
        <Link component={RouterLink} to={`/product/${product.slug}`} color="inherit">
          <Typography variant="subtitle1">
            {product.name}
          </Typography>
        </Link>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Box mr={0.5} mt={0.5}><Rating size="small" defaultValue={2.5} precision={0.5} readOnly /></Box>
          <Typography variant="body2" className={classes.sold}>
            | Sold
            {' '}
            {product.sold}
          </Typography>
        </Box>
        <Box
          className="price"
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Typography variant="h6" style={{ marginRight: 8 }}>
            $
            {product.price}
          </Typography>
          {(discount > 0) && (
          <Typography variant="button" className={classes.discount}>
            {`-${discount}%`}
          </Typography>
          )}
        </Box>
      </CardContent>
      <CardActions>
        <Button
          className={classes.addbutton}
          variant="contained"
          color="primary"
          size="medium"
          disableElevation
          disabled={isAdding}
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductCard;

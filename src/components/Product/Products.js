import PropTypes from 'prop-types';

import { makeStyles, Grid } from '@material-ui/core';

import ProductCard from './ProductCard';

const useStyles = makeStyles(() => ({
  root: {
    flexWrap: 'wrap',
  },
}));

const Products = ({ products }) => {
  const classes = useStyles();

  return (
    <Grid
      className={classes.root}
      container
      justifyContent="flex-start"
      alignItems="stretch"
      spacing={1}
    >
      {
        products.map((product) => (
          <Grid item key={product.id} className={classes.item} xs={12} sm={4} md={3}>
            <ProductCard
              product={product}
            />
          </Grid>
        ))
      }
    </Grid>
  );
};

Products.propTypes = {
  products: PropTypes.array
};

export default Products;

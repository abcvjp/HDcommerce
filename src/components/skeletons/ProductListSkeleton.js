import PropTypes from 'prop-types';
import shortid from 'shortid';
import { Grid } from '@material-ui/core';
import ProductCardSkeleton from './ProductCardSkeleton';

const ProductListSkeleton = ({ size }) => (
  <Grid
    container
    justifyContent="flex-start"
    alignItems="stretch"
    spacing={1}
    wrap="wrap"
  >
    {(new Array(size)).fill(0).map(() => (
      <Grid item key={shortid.generate()} xs={12} sm={4} md={3} style={{ width: '25%' }}>
        <ProductCardSkeleton />
      </Grid>
    ))}
  </Grid>
);

ProductListSkeleton.propTypes = {
  size: PropTypes.number.isRequired
};

export default ProductListSkeleton;

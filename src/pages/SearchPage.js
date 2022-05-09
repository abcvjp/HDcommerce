import { useState } from 'react';
import { useLocation } from 'react-router';

import { Helmet } from 'react-helmet';

import {
  Grid, makeStyles, Paper, Typography, Box
} from '@material-ui/core';

import { APP_TITLE } from 'src/constants/appInfo';

import PriceRangeFilter from 'src/components/accesscories/PriceRangeFilter';
import ProductList from '../components/Product/ProductList';
import Breadcrumbs from '../components/accesscories/Breadcrumbs';

const useStyles = makeStyles((theme) => ({
  root: {

  },
  main: {
  },
  margin: {
    margin: theme.spacing(2)
  },
  bar: {
    padding: theme.spacing(2),
    borderRight: '1px solid #e6e6e6'
  }
}));

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchPage = () => {
  const classes = useStyles();
  const keyword = useQuery().get('q');

  const [filters, setFilters] = useState({
    price: null
  });

  const handeApplyPriceRange = (priceRange) => {
    setFilters((prev) => ({ ...prev, price: priceRange }));
  };

  return (
    <>
      <Helmet>
        <title>
          Search for
          {' '}
          {`"${keyword}" | ${APP_TITLE}`}

        </title>
      </Helmet>

      <Breadcrumbs breadcrumbs={[{
        name: `Search results for: '${keyword}'`,
        path: ''
      }]}
      />

      <Paper elevation={1} square>
        <Grid container spacing={0} wrap="wrap">
          <Grid key="childs_category" item xs={12} sm={2} className={classes.bar}>
            <Box my={2}>
              <Typography variant="subtitle2">Price</Typography>
            </Box>
            <PriceRangeFilter
              initialValues={filters.price}
              onApply={handeApplyPriceRange}
            />
          </Grid>
          <Grid key="product_list" item sm={10} className={classes.main}>
            <Typography className={classes.margin} variant="h5">
              Search for
              {' '}
              {`"${keyword}"`}
            </Typography>
            <ProductList filters={{ q: keyword, ...filters }} />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default SearchPage;

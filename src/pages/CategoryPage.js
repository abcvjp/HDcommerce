import { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import {
  Grid, makeStyles, Paper, Typography,
  Box,
  Divider
} from '@material-ui/core';

import ProductList from 'src/components/Product/ProductList';
import Breadcrumbs from 'src/components/accesscories/Breadcrumbs';

import { useSelector } from 'react-redux';
import { generateBreadCrumbs, isArrayEmpty, isObjectEmpty } from 'src/utils/utilFuncs';
import { useParams } from 'react-router';
import CategoryChildrenTree from 'src/components/Category/CategoryChildrenTree';
import PriceRangeFilter from 'src/components/accesscories/PriceRangeFilter';

import { APP_TITLE } from 'src/constants/appInfo';

const useStyles = makeStyles((theme) => ({
  bar: {
    padding: theme.spacing(2),
    borderRight: '1px solid #e6e6e6'
  }
}));

const CategoryPage = () => {
  const classes = useStyles();
  const { categorySlug } = useParams();

  const data = useRef({
    category: null,
    breadcrumbs: []
  });

  const [filters, setFilters] = useState({
    price: null
  });

  const [, forceRerender] = useState(Date.now());

  const categoriesStore = useSelector((state) => state.categories);

  const handeApplyPriceRange = (priceRange) => {
    setFilters((prev) => ({ ...prev, price: priceRange }));
  };

  useEffect(() => {
    // CHECK CATEGORY IN STORE OTHERWISE FETCH CATEGORY BY SLUG
    if (!isObjectEmpty(categoriesStore.map_slug_id)) {
      const categoryId = categoriesStore.map_slug_id[categorySlug];
      const category = categoriesStore.all[categoryId];
      data.current = {
        category,
        breadcrumbs: generateBreadCrumbs(category.path, categoriesStore.map_name_slug)
      };
      forceRerender(Date.now());
    }
  }, [categorySlug, categoriesStore]);

  return (
    <>

      {!isArrayEmpty(data.current.breadcrumbs) && <Breadcrumbs breadcrumbs={data.current.breadcrumbs} />}

      {data.current.category && (
        <>
          <Helmet>
            <title>
              {`${data.current.category.meta_title} | ${APP_TITLE}`}
            </title>
            <meta name="description" content={data.current.category.meta_description} />
            <meta name="keywords" content={data.current.category.meta_keywords} />
          </Helmet>

          <Paper elevation={1} square>
            <Grid container spacing={0}>

              <Grid key="more" item xs={12} md={2} className={classes.bar}>
                {!isArrayEmpty(data.current.category.childs) && (
                <>
                  <Typography variant="subtitle2">Subcategory</Typography>
                  <Box my={2}>
                    <CategoryChildrenTree
                      childs={data.current.category.childs}
                    />
                  </Box>
                  <Divider />
                </>
                )}

                <Box my={2}>
                  <Typography variant="subtitle2">Price</Typography>
                </Box>
                <PriceRangeFilter
                  initialValues={filters.price}
                  onApply={handeApplyPriceRange}
                />

              </Grid>

              <Grid key="product_list" item md={10}>
                <Box m={2}>
                  <Typography variant="h5">
                    {data.current.category.name}
                  </Typography>
                </Box>
                <ProductList
                  filters={{ category_slug: categorySlug, ...filters }}
                />
              </Grid>

            </Grid>
          </Paper>
        </>
      )}

    </>
  );
};

export default CategoryPage;

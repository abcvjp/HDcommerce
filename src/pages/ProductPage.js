import {
  useState, useEffect, useRef, useCallback
} from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Helmet } from 'react-helmet';

import {
  Grid, makeStyles, Box, Paper, Divider, Button
} from '@material-ui/core';
import { generateBreadCrumbs, isArrayEmpty, isObjectEmpty } from 'src/utils/utilFuncs';
import { checkAndAddToCart } from 'src/actions/cartActions';
import { showAlertMessage } from 'src/actions/alertMessageActions';

import Breadcrumbs from 'src/components/accesscories/Breadcrumbs';
import ProductDetail from 'src/components/Product/ProductDetail';
import QuantitySelector from 'src/components/accesscories/QuantitySelector';
import ProductImages from 'src/components/Product/ProductImages';
import ProductDescription from 'src/components/Product/ProductDescription';
import { productApi } from 'src/utils/api';

import { APP_TITLE } from 'src/constants/appInfo';

const useStyles = makeStyles((theme) => ({
  detail: {
    padding: theme.spacing(2)
  },
  marginBlock: {
    marginBlock: theme.spacing(2)
  },
  margin: {
    margin: theme.spacing(2)
  },
  addcart: {
    fontWeight: 'bold',
    background: '#212529',
    color: '#ffffff',
    border: 'solid 2px #212529',
    transition: 'all 0.5s ease-in-out 0s',
    '&:hover': {
      background: 'transparent',
      color: '#212529',
    }
  },
  buynow: {
    marginLeft: theme.spacing(1),
    fontWeight: 'bold',
    background: 'red',
    color: '#ffffff',
    border: 'solid 2px red',
    transition: 'all 0.5s ease-in-out 0s',
    '&:hover': {
      background: 'transparent',
      color: 'red'
    }
  }
}));

const ProductPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mapCategoryNameSlug = useSelector((state) => state.categories.map_name_slug);

  const { productSlug } = useParams();
  const data = useRef({
    product: null,
    related_products: [],
    breadcrumbs: []
  });
  const [qty, setQty] = useState(1);

  const { product } = data.current;

  const [, forceRerender] = useState(Date.now());

  const handleQtyChange = useCallback((event) => {
    const newQty = parseInt(event.target.value, 10);
    if (newQty > product.quantity) {
      dispatch(showAlertMessage({ type: 'error', content: `You can only buy ${product.quantity} product` }));
    } else setQty(newQty);
  });

  const handleAddtoCart = useCallback(() => {
    dispatch(checkAndAddToCart({
      product_id: product.id,
      product_name: product.name,
      product_slug: product.slug,
      price: product.price,
      quantity: qty
    }));
  });

  const handleBuyNow = useCallback(() => {
    if (product.enable === false) {
      dispatch(showAlertMessage({ type: 'error', content: 'This product has been disabled' }));
    } else if (product.quantity === 0) {
      dispatch(showAlertMessage({ type: 'error', content: 'This product has sold out' }));
    } else {
      navigate('/checkout', {
        state: {
          pathname: '/checkout',
          orderItems: [{
            product_id: product.id,
            product_name: product.name,
            product_slug: product.slug,
            product_thumbnail: product.images[0],
            price: product.price,
            quantity: qty
          }]
        }
      });
    }
  });

  useEffect(() => {
    productApi.getProduct({
      slug: productSlug
    }).then((response) => response.data.data).then((fproduct) => {
      data.current.product = fproduct;
      forceRerender(Date.now());
    }).catch((err) => {
      console.log(err);
    });
  }, [productSlug]);

  useEffect(() => {
    if (product && !isObjectEmpty(mapCategoryNameSlug)) {
      data.current = {
        ...data.current,
        product,
        breadcrumbs: generateBreadCrumbs(`${product.category.path} - ${product.name}`, mapCategoryNameSlug)
      };
      forceRerender(Date.now());
    }
  }, [product, mapCategoryNameSlug]);

  return (
    <>
      {!isArrayEmpty(data.current.breadcrumbs) && <Breadcrumbs breadcrumbs={data.current.breadcrumbs} />}
      {product && (
      <>
        <Helmet>
          <title>
            {`${product.meta_title} | ${APP_TITLE}`}
          </title>
          <meta name="description" content={product.meta_description} />
          <meta name="keywords" content={product.meta_keywords} />
        </Helmet>

        <Paper className={classes.detail} elevation={0}>
          <Grid container direction="row" justifyContent="space-between" spacing={4}>

            <Grid
              key="product_images"
              item
              xs={12}
              md={5}
            >
              {product.images && <ProductImages images={product.images} productName={product.name} />}
            </Grid>

            <Grid
              key="product_detail"
              className={`${classes.detail}`}
              md={7}
              item
              container
              direction="column"
              justifyContent="flex-start"
            >
              <Grid item>
                <ProductDetail product={product} />
              </Grid>

              <Grid item>
                <Divider light />
                <div id="select-area">
                  <Box sx={{ my: 2 }}>
                    <QuantitySelector qty={qty} handleQtyChange={handleQtyChange} />
                  </Box>
                  <Button
                    className={classes.addcart}
                    variant="contained"
                    color="primary"
                    size="medium"
                    disableElevation
                    onClick={handleAddtoCart}
                  >
                    ADD TO CART
                  </Button>
                  <Button
                    className={classes.buynow}
                    variant="contained"
                    color="primary"
                    size="medium"
                    disableElevation
                    onClick={handleBuyNow}
                  >
                    BUY NOW
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Paper>

        <Box sx={{ my: 4 }}>
          <div id="product-description">
            <ProductDescription description={product.description} />
          </div>
        </Box>

      </>
      )}
    </>
  );
};

export default ProductPage;

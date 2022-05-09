import {
  useEffect, useRef, useState, useCallback
} from 'react';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import {
  Grid,
  makeStyles,
  Typography,
  Paper,
  Box
} from '@material-ui/core';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';

import OrderSummary from 'src/components/Order/OrderSummary';
import ShippingForm from 'src/components/Order/ShippingForm';
import ReviewAndPayment from 'src/components/Order/ReviewAndPayment';
import SuccessDialog from 'src/components/Order/SuccessDialog';

import ShippingMethod from 'src/components/Order/ShippingMethod';
import { orderApi } from 'src/utils/api';
import { openConfirmDialog } from 'src/actions/confirmDialog';
import { closeFullScreenLoading, openFullScreenLoading } from 'src/actions/fullscreenLoading';
import ErrorDialog from 'src/components/Order/ErrorDialog';
import { isArrayEmpty } from 'src/utils/utilFuncs';

import { useFormik, FormikProvider } from 'formik';
import { deleteCart } from 'src/actions/cartActions';
import ContainedButton from 'src/components/styled-material/ContainedButton';

import { APP_TITLE } from 'src/constants/appInfo';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2)
  },
  title: {
    marginBlock: theme.spacing(3)
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  stepper: {
    marginBlock: theme.spacing(3)
  },
  nextback: {
    display: 'flex',
    width: '100%',
    marginBlock: theme.spacing(2),
    justifyContent: 'space-between'
  },
  error: {
    fontColor: 'red',
    marginBlock: theme.spacing(1)
  }
}));

const steps = ['Shipping', 'Review and Payment'];

const CheckoutPage = () => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const orderItems = useRef([]);

  const [, forceRerender] = useState(Date.now());

  const [state, setState] = useState({
    activeStep: 0,
    isOrderSuccess: false,
    placedOrder: {},
    error: ''
  });

  const [shippingMethod, setShippingMethod] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const handleNext = useCallback(() => {
    setState((prevState) => ({ ...prevState, activeStep: prevState.activeStep + 1 }));
  });

  const handleBack = useCallback((data) => {
    setState((prevState) => ({ ...prevState, ...data, activeStep: prevState.activeStep - 1 }));
  });

  const callPlaceOrder = useCallback((orderInfo) => {
    const order_items = orderItems.current.map((item) => {
      const {
        buy_able, product_slug, product_thumbnail, isSelected, ...temp
      } = item;
      return temp;
    });
    const {
      email,
      customer_name,
      phone_number,
      address,
      shipping_note,
      shipping_method_id,
      payment_method_id
    } = orderInfo;

    return orderApi.createOrder({
      email,
      customer_name,
      phone_number,
      address,
      shipping_note,
      shipping_method_id,
      payment_method_id,
      order_items
    });
  });

  const handlePlaceOrder = useCallback(async (orderInfo) => {
    dispatch(openConfirmDialog({
      message: 'Confirm order?',
      onConfirm: async () => {
        dispatch(openFullScreenLoading());
        try {
          const response = await callPlaceOrder(orderInfo);
          setState((prevState) => ({ ...prevState, isOrderSuccess: true, placedOrder: response.data.result }));
          dispatch(deleteCart());
        } catch (error) {
          if (error.response) {
            setState((prevState) => ({ ...prevState, isOrderSuccess: false, error: error.response.data.error.message }));
          }
        }
        dispatch(closeFullScreenLoading());
      }
    }));
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      customer_name: '',
      phone_number: '',
      address: '',
      shipping_note: '',
      shipping_method_id: '',
      payment_method_id: ''
    },
    validationSchema: Yup.object().shape({
      customer_name: Yup.string().max(100).required('Full name is required'),
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      phone_number: Yup.string().length(10).matches(/^[0-9]+$/, 'Phone number is not valid').required('Phone number is required'),
      address: Yup.string().min(10).max(255).required('Shipping address is required'),
      shipping_note: Yup.string().max(255),
      shipping_method_id: Yup.number().required('Shipping method is required'),
      payment_method_id: Yup.number().required('Payment method is required')
    }),
    onSubmit: handlePlaceOrder,
    validateOnChange: true,
    validateOnBlur: false
  });

  const handleClickPlaceOrder = useCallback(async () => {
    await formik.setFieldTouched('shipping_method_id', true);
    await formik.setFieldTouched('payment_method_id', true);
    if (formik.isValid) {
      await formik.submitForm();
    } else if (formik.errors.payment_method_id) {
      setState((prevState) => ({ ...prevState, activeStep: 1 }));
    } else {
      setState((prevState) => ({ ...prevState, activeStep: 0 }));
    }
  }, [formik.isValid, formik.errors]);

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <>
            <ShippingForm />
            <ShippingMethod
              fieldName="shipping_method_id"
              setShippingMethod={setShippingMethod}
            />
          </>
        );
      case 1:
        return (
          <ReviewAndPayment
            fieldName="payment_method_id"
            setPaymentMethod={setPaymentMethod}
          />
        );
      default:
        return 'Unknown stepIndex';
    }
  };

  useEffect(() => {
    orderItems.current = location.state.orderItems;
    if (isArrayEmpty(orderItems.current)) {
      navigate('/cart');
    }
    forceRerender(Date.now());
  }, [location]);

  return (
    <>
      <Helmet>
        <title>
          Checkout |
          {' '}
          {APP_TITLE}
        </title>
      </Helmet>

      {!isArrayEmpty(orderItems.current) && (
        <>
          <Typography variant="h5" className={classes.title}>
            Checkout
          </Typography>

          <Paper className={`${classes.paper} ${classes.stepper}`} elevation={0}>
            <Stepper activeStep={state.activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Paper>

          <Paper elevation={0} className={classes.paper}>

            <Grid container spacing={4} justifyContent="space-between" alignItems="flex-start">
              <Grid item xs={12} md={8}>
                <>
                  <FormikProvider value={formik}>
                    {getStepContent(state.activeStep)}
                  </FormikProvider>

                  <Box className={classes.nextback}>
                    {state.activeStep === 0
                      ? (
                        <ContainedButton
                          onClick={() => navigate(-1)}
                        >
                          BACK TO PREV
                        </ContainedButton>
                      )
                      : (
                        <ContainedButton
                          onClick={handleBack}
                        >
                          BACK
                        </ContainedButton>
                      )}

                    {state.activeStep === steps.length - 1
                      ? (
                        <ContainedButton
                          onClick={handleClickPlaceOrder}
                        >
                          PLACE ORDER
                        </ContainedButton>
                      )
                      : (
                        <ContainedButton
                          size="large"
                          onClick={handleNext}
                        >
                          {state.activeStep === steps.length - 1 ? 'PLACE ORDER' : 'NEXT'}
                        </ContainedButton>
                      )}
                  </Box>
                </>
              </Grid>

              <Grid item md={4} style={{ flexGrow: 1 }}>
                <OrderSummary
                  orderItems={orderItems.current}
                  shippingMethod={shippingMethod}
                  paymentMethod={paymentMethod}
                />
              </Grid>
            </Grid>
            {state.isOrderSuccess && <SuccessDialog order={state.placedOrder} />}
            {state.error && <ErrorDialog error={state.error} />}
          </Paper>
        </>
      )}
    </>
  );
};

export default CheckoutPage;

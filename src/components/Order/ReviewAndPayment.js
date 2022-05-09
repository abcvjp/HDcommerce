import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import {
  Typography, Divider, Radio, FormControlLabel, RadioGroup, Grid, makeStyles
} from '@material-ui/core';
import { orderApi } from 'src/utils/api';

/* eslint-disable react/prop-types */

const useStyles = makeStyles((theme) => ({
  title: {
    marginBlock: theme.spacing(2)
  },
  margin: {
    marginBlock: theme.spacing(2)
  }
}));
const ReviewAndPayment = ({ fieldName, setPaymentMethod }) => {
  const classes = useStyles();
  const [paymentMethods, setPaymentMethods] = useState([]);

  const [field, meta, helpers] = useField(fieldName);

  const handlePaymentMethodChange = (e) => {
    const value = parseInt(e.target.value, 10);
    helpers.setValue(value);
    setPaymentMethod(paymentMethods.find((i) => i.id === value));
  };

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await orderApi.getPaymentMethods();
        setPaymentMethods(response.data.data);
      } catch (error) {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
      }
    };

    fetchPaymentMethods();
    // eslint-disable-next-line
	}, [])

  return (
    <div id="review-and-payment">
      <div className={classes.title}>
        <Typography variant="h6" className={classes.margin}>Payment Method</Typography>
        <Divider />
      </div>

      {paymentMethods.length > 0
        ? (
          <RadioGroup
            name={fieldName}
            value={field.value}
            onChange={handlePaymentMethodChange}
          >
            <Grid container direction="column">
              {paymentMethods.map((paymentMethod) => ( // eslint-disable-line
                <Grid key={`shipping_method_${paymentMethod.id}`} item container justifyContent="space-between" alignItems="center" spacing={8}>
                  <Grid key="shipping_name" item>
                    <FormControlLabel
                      value={paymentMethod.id}
                      control={<Radio />}
                      label={paymentMethod.name}
                    />
                  </Grid>
                  <Grid key="shipping_detail" item>
                    <Typography variant="caption">
                      {paymentMethod.detail}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </RadioGroup>
        )
        : <Typography>Sorry, no available payment method now!</Typography>}

      {meta.touched && meta.error && (
        <Typography color="error" variant="caption">
          {meta.error}
        </Typography>
      )}
    </div>
  );
};

ReviewAndPayment.propTypes = {
  fieldName: PropTypes.string.isRequired,
  setPaymentMethod: PropTypes.func.isRequired
};

export default ReviewAndPayment;

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import {
  Typography, Divider, makeStyles, Radio, FormControlLabel, RadioGroup, Grid
} from '@material-ui/core';
import { orderApi } from 'src/utils/api';

const useStyles = makeStyles((theme) => ({
  title: {
    marginBlock: theme.spacing(2)
  },
  margin: {
    marginBlock: theme.spacing(2)
  },
  textField: {
    maxWidth: '70%'
  },
  shipfee: {
    fontWeight: 'bold'
  }
}));

const ShippingMethod = ({ fieldName, setShippingMethod }) => {
  const classes = useStyles();
  const [shippingMethods, setShippingMethods] = useState([]);

  const [field, meta, helpers] = useField(fieldName);

  const handleShippingMethodChange = (e) => {
    const value = parseInt(e.target.value, 10);
    helpers.setValue(value);
    setShippingMethod(shippingMethods.find((i) => i.id === value));
  };

  useEffect(() => {
    const fetchShippingMethods = async () => {
      try {
        const response = await orderApi.getShippingMethods();
        setShippingMethods(response.data.data);
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

    fetchShippingMethods();
    // eslint-disable-next-line
  }, [])

  return (
    <div id="shipping-methods">
      <div className={classes.title}>
        <Typography variant="h6" className={classes.margin}>Shipping Methods</Typography>
        <Divider />
      </div>

      {shippingMethods.length > 0
        ? (
          <RadioGroup
            name={fieldName}
            onBlur={field.onBlur}
            value={field.value}
            onChange={handleShippingMethodChange}
          >
            <Grid container direction="column">
              {shippingMethods.map((shippingMethod) => (
                <Grid key={`shipping_method_${shippingMethod.id}`} item container justifyContent="space-between" alignItems="center" spacing={8}>
                  <Grid key="shipping_name" item>
                    <FormControlLabel
                      value={shippingMethod.id}
                      control={<Radio />}
                      label={shippingMethod.name}
                    />
                  </Grid>
                  <Grid key="shipping_detail" item>
                    <Typography variant="caption">
                      {shippingMethod.detail}
                    </Typography>
                  </Grid>
                  <Grid key="shipping_fee" item className={classes.shipfee}>
                    $
                    {shippingMethod.fee}
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </RadioGroup>
        )
        : <Typography>Sorry, no available shipping method now!</Typography>}

      {meta.touched && meta.error && (
      <Typography color="error" variant="caption">
        {meta.error}
      </Typography>
      )}

    </div>
  );
};

ShippingMethod.propTypes = {
  fieldName: PropTypes.string.isRequired,
  setShippingMethod: PropTypes.func.isRequired
};

export default ShippingMethod;

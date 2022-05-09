import { useFormikContext } from 'formik';
import {
  Typography, Divider, makeStyles, TextField
} from '@material-ui/core';

/* eslint-disable react/prop-types */

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

const ShippingForm = () => {
  const classes = useStyles();

  const {
    errors,
    handleBlur,
    handleChange,
    touched,
    values
  } = useFormikContext();

  return (
    <>
      <div className={classes.title}>
        <Typography variant="h6" className={classes.margin}>Shipping Address</Typography>
        <Divider />
      </div>
      <>
        <TextField
          className={classes.textField}
          InputLabelProps={{ shrink: true, color: 'primary' }}
          fullWidth
          variant="outlined"
          margin="normal"
          key="email"
          label="EMAIL"
          error={Boolean(touched.email && errors.email)}
          helperText={touched.email && errors.email}
          name="email"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email}
          required
        />

        <TextField
          className={classes.textField}
          InputLabelProps={{ shrink: true, color: 'primary' }}
          fullWidth
          variant="outlined"
          margin="normal"
          key="customer_name"
          label="FULL NAME"
          error={Boolean(touched.customer_name && errors.customer_name)}
          helperText={touched.customer_name && errors.customer_name}
          name="customer_name"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.customer_name}
          required
        />

        <TextField
          className={classes.textField}
          InputLabelProps={{ shrink: true, color: 'primary' }}
          fullWidth
          variant="outlined"
          margin="normal"
          key="phone_number"
          label="PHONE NUMBER"
          error={Boolean(touched.phone_number && errors.phone_number)}
          helperText={touched.phone_number && errors.phone_number}
          name="phone_number"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.phone_number}
          required
        />

        <TextField
          className={classes.textField}
          InputLabelProps={{ shrink: true, color: 'primary' }}
          fullWidth
          variant="outlined"
          margin="normal"
          multiline
          rows={4}
          key="address"
          label="SHIPPING ADDRESS DETAIL (Street, district, city, ...)"
          error={Boolean(touched.address && errors.address)}
          helperText={touched.address && errors.address}
          name="address"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.address}
          required
        />

        <TextField
          className={classes.textField}
          InputLabelProps={{ shrink: true, color: 'primary' }}
          fullWidth
          variant="outlined"
          margin="normal"
          multiline
          rows={4}
          key="shipping_note"
          label="SHIPPING NOTE"
          error={Boolean(touched.shipping_note && errors.shipping_note)}
          helperText={touched.shipping_note && errors.shipping_note}
          name="shipping_note"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.shipping_note}
        />
      </>
    </>
  );
};

export default ShippingForm;

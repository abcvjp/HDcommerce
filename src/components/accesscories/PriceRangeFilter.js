import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box, Typography, TextField, Button
} from '@material-ui/core';

const PriceRangeFilter = ({ initialValues, onApply }) => (
  <Formik
    initialValues={{
      start: initialValues ? initialValues.split(',')[0] : 0,
      end: initialValues ? initialValues.split(',')[1] : 0
    }}
    validationSchema={Yup.object().shape({
      start: Yup.number().min(0).max(9999999999),
      end: Yup.number().min(0).max(9999999999)
    })}
    onSubmit={(values) => onApply(`${values.start},${values.end}`)}
  >
    {({
      handleBlur,
      handleChange,
      handleSubmit,
      values
    }) => (
      <form onSubmit={handleSubmit}>

        <Box>
          <Typography
            color="textPrimary"
            variant="caption"
          >
            Select price range
          </Typography>
        </Box>

        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          wrap="wrap"
        >
          <Box width="40%">
            <TextField
              size="small"
              variant="outlined"
              margin="dense"
              fullWidth
              name="start"
              value={values.start}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Box>

          <Box mx={1}>
            {' - '}
          </Box>

          <Box width="40%">
            <TextField
              size="small"
              variant="outlined"
              margin="dense"
              fullWidth
              name="end"
              value={values.end}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Box>

        </Box>
        <Box my={1}>
          <Button
            color="secondary"
            size="small"
            type="submit"
            variant="outlined"
          >
            Apply
          </Button>
        </Box>
      </form>
    )}
  </Formik>
);

PriceRangeFilter.propTypes = {
  initialValues: PropTypes.string,
  onApply: PropTypes.func.isRequired
};

export default PriceRangeFilter;

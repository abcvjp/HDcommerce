import { Helmet } from 'react-helmet';
import {
  makeStyles,
  Paper,
  Grid,
  Typography,
  Box,
  TextField,
  Button,
  MenuItem,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';

import { APP_TITLE } from 'src/constants/appInfo';
import { blueGrey } from '@material-ui/core/colors';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { userApi } from 'src/utils/api';
import { Shop } from '@material-ui/icons';
import { useNavigate } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBlock: theme.spacing(10),
    paddingInline: theme.spacing(15),
    backgroundColor: blueGrey[300],
    minHeight: '85%'
  },
  title: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(2)
  },
  main: {
    padding: theme.spacing(4),
    minWidth: '40%'
  },
  icon: {
    fontSize: theme.spacing(30),
    textAlign: 'center',
    color: 'white',
    width: '100%'
  }
}));

const genders = [{ name: 'Male', value: 1 }, { name: 'Female', value: 2 }, { name: 'Other', value: 3 }];

const RegisterPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isOpenResult, setIsOpenResult] = useState(false);

  const handleResultOpen = () => {
    setIsOpenResult(true);
  };
  const handleResultClose = () => {
    setIsOpenResult(false);
  };
  const handleContinue = () => {
    navigate('/login', { replace: true });
  };
  const handleBackTo = () => {
    navigate('/', { replace: true });
  };

  const handleRegister = async (values) => {
    try {
      const response = await userApi.signup(values); // eslint-disable-line
      handleResultOpen();
    } catch (err) {
      console.log(err.response);
      setError(err.response.data.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>
          {APP_TITLE}
          {' '}
          | Register
        </title>
      </Helmet>

      <Grid container justifyContent="space-between" className={classes.root}>
        <Grid item xs={7}>
          <Shop fontSize="inherit" className={classes.icon} />
          <Box
            sx={{
              pb: 1,
              pt: 1,
              color: 'white'
            }}
          >
            <Typography
              align="center"
              color="inherit"
              variant="h3"
            >
              HDcommerce
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Paper elevation={3} className={classes.main}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h5" color="textPrimary">Đăng ký</Typography>
            </Box>
            <Formik
              initialValues={{
                email: '',
                password: '',
                fullName: '',
                phoneNumber: '',
                gender: undefined,
                birthDay: ''
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .min(4)
                  .max(255)
                  .required('Email is required'),
                password: Yup.string().min(6).max(255).required('Password is required'),
                fullName: Yup.string().min(1).max(50).required('Full name is required'),
                phoneNumber: Yup.string().min(7)
                  .required('Phone number is required'),
                gender: Yup.mixed().oneOf([1, 2, 3]),
                birthDay: Yup.date(),
              })}
              onSubmit={handleRegister}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values
              }) => (
                <form onSubmit={handleSubmit}>
                  {error && (
                  <Box
                    sx={{
                      pb: 1,
                      pt: 3
                    }}
                  >
                    <Typography align="left" color="error" variant="body1">
                      {error}
                    </Typography>
                  </Box>
                  )}
                  <TextField
                    InputLabelProps={{ shrink: true, color: 'primary' }}
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Email address"
                    margin="normal"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="email"
                    value={values.email}
                    variant="outlined"
                    required
                  />
                  <TextField
                    InputLabelProps={{ shrink: true, color: 'primary' }}
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    label="Password"
                    margin="normal"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="outlined"
                    required
                  />
                  <TextField
                    InputLabelProps={{ shrink: true, color: 'primary' }}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    key="fullName"
                    label="Full name"
                    error={Boolean(touched.fullName && errors.fullName)}
                    helperText={touched.fullName && errors.fullName}
                    name="fullName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.fullName}
                    required
                  />
                  <TextField
                    InputLabelProps={{ shrink: true, color: 'primary' }}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    key="phoneNumber"
                    label="Phone number"
                    error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                    name="phoneNumber"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phoneNumber}
                    required
                  />
                  <TextField
                    InputLabelProps={{ shrink: true, color: 'primary' }}
                    fullWidth
                    error={Boolean(touched.gender && errors.gender)}
                    helperText={touched.gender && errors.gender}
                    label="Gender"
                    name="gender"
                    margin="normal"
                    select
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.gender}
                    variant="outlined"
                    required
                  >
                    {genders.map((e) => (
                      <MenuItem key={e.name} value={e.value}>
                        {e.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    error={Boolean(touched.birthDay && errors.birthDay)}
                    helperText={touched.birthDay && errors.birthDay}
                    label="Birthday"
                    name="birthDay"
                    type="date"
                    margin="normal"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.birthDay}
                    variant="outlined"
                    InputLabelProps={{ shrink: true, color: 'primary' }}
                  />
                  <Box sx={{ py: 2 }}>
                    <Button
                      color="secondary"
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      REGISTER NOW
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Paper>
        </Grid>
      </Grid>
      <Dialog open={isOpenResult} onClose={handleResultClose}>
        <DialogContent>
          <DialogContentText style={{ color: 'green' }}>
            Your account is created successfully
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            variant="contained"
            onClick={handleContinue}
          >
            Login now
          </Button>

          <Button
            color="primary"
            variant="contained"
            onClick={handleBackTo}
          >
            Back to Home
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RegisterPage;

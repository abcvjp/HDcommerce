import { Helmet } from 'react-helmet';
import {
  makeStyles,
  Paper,
  Grid,
  Typography,
  Box,
  TextField,
  Button,
} from '@material-ui/core';

import { APP_TITLE } from 'src/constants/appInfo';
import { blue } from '@material-ui/core/colors';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { showAlertMessage } from 'src/actions/alertMessageActions';
import { userApi } from 'src/utils/api';
import { Shop } from '@material-ui/icons';
import { Link as RouterLink, Link } from 'react-router-dom';
import { setUser } from 'src/actions/userActions';
import { getCart } from 'src/actions/cartActions';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBlock: theme.spacing(10),
    paddingInline: theme.spacing(15),
    backgroundColor: blue[300],
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

const LoginPage = () => {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (values) => {
    try {
      const response = await userApi.login(values); // eslint-disable-line
      const { user, accessToken } = response.data.data;
      if (user) {
        dispatch(setUser(user));
        localStorage.setItem('access_token', accessToken);
        navigate('/', { replace: true });
        dispatch(showAlertMessage({
          type: 'success',
          content: 'Login succeed'
        }));
        dispatch(getCart());
      } else {
        setError('Your account does not have permission to access');
      }
    } catch (err) {
      console.log(err.response);
      setError(err.response.data.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>{APP_TITLE}</title>
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
              <Typography variant="h5" color="textPrimary">Đăng nhập</Typography>
            </Box>
            <Formik
              initialValues={{
                email: 'hoaideptrai@example.com',
                password: '123456'
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .min(4)
                  .max(255)
                  .required('Email is required'),
                password: Yup.string().max(255).required('Password is required')
              })}
              onSubmit={handleLogin}
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
                  />
                  <TextField
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
                  />
                  <Box sx={{ py: 2, mb: 2 }}>
                    <Button
                      color="secondary"
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Sign in now
                    </Button>
                  </Box>
                  <Box sx={{ textAlign: 'center', fontSize: '1rem' }}>
                    New to HDcommerce?
                    {' '}
                    <Link
                      component={RouterLink}
                      to="/register"
                      underline="none"
                      color="primary"
                    >
                      Register
                    </Link>
                  </Box>
                </form>
              )}
            </Formik>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginPage;

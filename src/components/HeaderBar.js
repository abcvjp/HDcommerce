import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import { Link as RouterLink } from 'react-router-dom';
import {
  Button,
  Container, CssBaseline, Divider, IconButton, Tooltip
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { ExitToApp, Person } from '@material-ui/icons';
import { userApi } from 'src/utils/api';
import { setUser } from 'src/actions/cartActions';
import { closeFullScreenLoading, openFullScreenLoading } from 'src/actions/fullscreenLoading';
import { showAlertMessage } from 'src/actions/alertMessageActions';
import MiniCart from './Cart/MiniCart';
import HeaderCategories from './Category/HeaderCategories';
import SearchBar from './SearchBar';

const useStyles = makeStyles((theme) => ({
  headerbar: {
    position: 'fixed'
  },
  toolbar: {
    margin: 0,
    padding: 0
  },
  grow: {
    flexGrow: 1
  },
  logo: {
    maxHeight: 80,
    maxWidth: 160,
    margin: theme.spacing(1)
  }
}));

const HeaderBar = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(openFullScreenLoading());
    try {
      await userApi.logout();
      dispatch(setUser(null));
      sessionStorage.clear('user');
      localStorage.removeItem('access_token');
      navigate('/');
      dispatch(showAlertMessage({
        type: 'success',
        content: 'Logout succeed'
      }));
    } catch (err) {
      console.log(err.response.data.message);
      dispatch(showAlertMessage({
        type: 'error',
        content: 'Logout failed'
      }));
    }
    dispatch(closeFullScreenLoading());
  };
  return (
    <>
      <CssBaseline />
      <AppBar position="sticky" color="inherit" elevation={0}>
        <Container maxWidth="lg">
          <Toolbar className={classes.toolbar}>
            <RouterLink to="/">
              <img
                className={classes.logo}
                id="logo"
                alt="logo"
                src={`${process.env.PUBLIC_URL}/logo.jpg`}
              />
            </RouterLink>
            <div className={classes.grow} />

            <SearchBar />

            {user
              ? (
                <Tooltip title="Account">
                  <IconButton
                    color="inherit"
                    size="medium"
                    component={RouterLink}
                    to="/account"
                  >
                    <Person fontSize="large" />
                  </IconButton>
                </Tooltip>
              )
              : (
                <Button
                  color="inherit"
                  size="medium"
                  component={RouterLink}
                  to="/login"
                >
                  Login
                </Button>
              )}

            <MiniCart />

            {user && (
              <Tooltip title="Logout">
                <IconButton
                  color="inherit"
                  size="medium"
                  onClick={handleLogout}
                >
                  <ExitToApp fontSize="large" />
                </IconButton>
              </Tooltip>
            )}
          </Toolbar>
          <HeaderCategories />
        </Container>
        <Divider />
      </AppBar>
    </>
  );
};
export default HeaderBar;

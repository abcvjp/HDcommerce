import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import { Link as RouterLink } from 'react-router-dom';
import {
  Button,
  Container, CssBaseline, IconButton, Tooltip
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { ExitToApp, Person } from '@material-ui/icons';
import { closeFullScreenLoading, openFullScreenLoading } from 'src/actions/fullscreenLoading';
import { showAlertMessage } from 'src/actions/alertMessageActions';
import { logout } from 'src/actions/userActions';
import { blue } from '@material-ui/core/colors';
import MiniCart from './Cart/MiniCart';
import HeaderCategories from './Category/HeaderCategories';
import SearchBar from './SearchBar';

const useStyles = makeStyles((theme) => ({
  headerbar: {
    backgroundColor: blue[500]
  },
  categories: {
    backgroundColor: 'white',
  },
  toolbar: {
    margin: 0,
    padding: 0,
    // color: 'black'
  },
  search: {
    color: 'black'
  },
  grow: {
    flexGrow: 1
  },
  logo: {
    // minHeight: 55,
    // maxHeight: 60,
    // minWidth: 180,
    // maxWidth: 200,
    width: theme.spacing(27),
    height: theme.spacing(8),
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
      await dispatch(logout());
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
      <AppBar position="sticky" elevation={0} className={classes.headerbar}>
        <Container maxWidth="lg">
          <Toolbar className={classes.toolbar}>
            <RouterLink to="/">
              <img
                className={classes.logo}
                id="logo"
                alt="logo"
                src={`${process.env.PUBLIC_URL}/logo.png`}
              />
            </RouterLink>
            <div className={classes.grow} />

            <div className={classes.search}>

              <SearchBar />
            </div>

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
        </Container>
        <div className={classes.categories}>
          <Container maxWidth="lg">
            <HeaderCategories />
          </Container>
        </div>
      </AppBar>
    </>
  );
};
export default HeaderBar;

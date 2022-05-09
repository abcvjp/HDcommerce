import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import { Link } from 'react-router-dom';
import { Container, CssBaseline, Divider } from '@material-ui/core';
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
  return (
    <>
      <CssBaseline />
      <AppBar position="sticky" color="inherit" elevation={0}>
        <Container maxWidth="lg">
          <Toolbar className={classes.toolbar}>
            <Link to="/">
              <img
                className={classes.logo}
                id="logo"
                alt="logo"
                src={`${process.env.PUBLIC_URL}/logo.jpg`}
              />
            </Link>
            <div className={classes.grow} />

            <SearchBar />

            <MiniCart />
          </Toolbar>
          <HeaderCategories />
        </Container>
        <Divider />
      </AppBar>
    </>
  );
};
export default HeaderBar;

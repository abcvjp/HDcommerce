import {
  BrowserRouter,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ThemeProvider } from '@material-ui/core/styles';
import theme from 'src/theme';

import HeaderBar from 'src/components/HeaderBar';
import Footer from 'src/components/Footer';
import Routing from 'src/components/Routing';
import GlobalComponents from 'src/components/global';
import GlobalStyles from 'src/components/GlobalStyles';
import { Helmet } from 'react-helmet';

import { useEffect } from 'react';
import { APP_TITLE, APP_AUTHOR, APP_DESCRIPTION } from './constants/appInfo';
import { setUser } from './actions/userActions';
import { getCart } from './actions/cartActions';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const savedUser = window.localStorage.getItem('user');
  const savedAccessToken = window.localStorage.getItem('access_token');

  useEffect(() => {
    if (savedUser && savedAccessToken && !user) {
      dispatch(setUser(savedUser));
      dispatch(getCart());
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>{APP_TITLE}</title>
        <meta name="author" content={APP_AUTHOR} />
        <meta name="description" content={APP_DESCRIPTION} />
      </Helmet>

      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <BrowserRouter>
          <HeaderBar />
          <Routing />
        </BrowserRouter>
        <Footer />
        <GlobalComponents />
      </ThemeProvider>
    </>
  );
}

export default App;

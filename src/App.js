import {
  BrowserRouter,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { ThemeProvider } from '@material-ui/core/styles';
import theme from 'src/theme';

import HeaderBar from 'src/components/HeaderBar';
import Footer from 'src/components/Footer';
import Routing from 'src/components/Routing';
import GlobalComponents from 'src/components/global';
import GlobalStyles from 'src/components/GlobalStyles';
import { Helmet } from 'react-helmet';

import { setUser } from 'src/actions/cartActions';
import { APP_TITLE, APP_AUTHOR, APP_DESCRIPTION } from './constants/appInfo';

function App() {
  const dispatch = useDispatch();
  const savedUser = window.localStorage.getItem('user');
  const savedAccessToken = window.localStorage.getItem('access_token');
  if (savedUser && savedAccessToken) {
    dispatch(setUser(savedUser));
  }
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

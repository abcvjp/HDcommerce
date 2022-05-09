import { createTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import {
  blue, dark, grey
} from 'src/utils/colors';

const theme = createTheme({
  palette: {
    secondary: blue,
    primary: dark,
    error: red,
    status: {
      danger: 'red',
      warning: 'orange'
    },
    white: 'white',
    grey
  },
  typography: {
    fontFamily: ['"Montserrat"', 'Open Sans'].join(','),
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    h6: {
      fontWeight: 400
    }
  },
  stepper: {
    iconColor: blue.main
  }
});

export default theme;

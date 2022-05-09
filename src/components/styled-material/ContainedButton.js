import {
  Button,
  withStyles
} from '@material-ui/core';

const styles = (theme) => ({
  contained: {
    color: 'white',
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main
    }
  }
});

// eslint-disable-next-line
const ContainedButton = ({children, ...other}) => (
  <Button
    {...other}
    variant="contained"
    disableRipple
    disableElevation
  >
    {children}
  </Button>
);

export default withStyles(styles)(ContainedButton);

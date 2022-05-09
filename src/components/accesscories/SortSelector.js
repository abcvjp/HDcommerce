import { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { Typography } from '@material-ui/core';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(',')
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  justify: {
    justifySelf: 'end',
    display: 'inline-flex',
    alignItems: 'center'
  },
  typo: {
    marginRight: theme.spacing(1)
  }
}));

const SortSelector = ({ sortBy, handleSortChange, sortElemnents }) => {
  const classes = useStyles();
  return (
    <div className={classes.justify}>
      <Typography className={classes.typo}>Sort by</Typography>
      <NativeSelect
        variant="standard"
        value={sortBy}
        onChange={handleSortChange}
        input={<BootstrapInput />}
      >
        {
          sortElemnents.map((element) => <option key={element.name} value={element.value}>{element.name}</option>)
        }
      </NativeSelect>
    </div>
  );
};

SortSelector.propTypes = {
  sortBy: PropTypes.string.isRequired,
  handleSortChange: PropTypes.func.isRequired,
  sortElemnents: PropTypes.array.isRequired
};

export default memo(SortSelector, (prevProps, nextProps) => (prevProps.sortBy === nextProps.sortBy));

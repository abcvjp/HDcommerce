import PropTypes from 'prop-types';
import { makeStyles, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  qty: {
    maxWidth: theme.spacing(12),
    '& .MuiFormLabel-root': {
      color: 'black' // or black
    }
  },

}));

const QuantitySelector = ({ qty, handleQtyChange }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TextField
        className={classes.qty}
        type="number"
        variant="outlined"
        label="Quantity"
        InputProps={{ inputProps: { min: 1 } }}
        value={qty || ''}
        onChange={handleQtyChange}
      />
    </div>
  );
};

QuantitySelector.propTypes = {
  qty: PropTypes.number.isRequired,
  handleQtyChange: PropTypes.func.isRequired
};

export default QuantitySelector;

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, Box } from '@material-ui/core';
import categoryApi from 'src/utils/api/categoryApi';
import HeaderCategory from './HeaderCategory';

import { setCategories } from '../../actions/categoryActions';
import { isArrayEmpty } from '../../utils/utilFuncs';

const useStyles = makeStyles(() => ({
  root: {
  }
}));
const HeaderCategories = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.tree);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await categoryApi.getAll();
      dispatch(setCategories(response.data.data));
    };
    fetchCategories();
  }, [dispatch]);

  return (
    !isArrayEmpty(categories) && (
    <Box className={classes.root} display="flex" flexDirection="row" justifyContent="flex-start" alignItems="center">
      {categories.map((category) => <HeaderCategory key={category.id} category={category} />)}
    </Box>
    )
  );
};

export default HeaderCategories;

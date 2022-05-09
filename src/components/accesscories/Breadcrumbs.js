import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Breadcrumbs as BreadcrumbsComponent, Link } from '@material-ui/core';

import { Link as RouterLink } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles((theme) => ({
  link: {
    display: 'flex',
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  breadcrumbs: {
    marginBlock: theme.spacing(3)
  }
}));

export default function Breadcrumbs({ breadcrumbs = [] }) {
  const classes = useStyles();

  return (
    <BreadcrumbsComponent className={classes.breadcrumbs} separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
      <Link color="inherit" component={RouterLink} to="/" className={classes.link}>
        <HomeIcon className={classes.icon} />
        Home
      </Link>
      {breadcrumbs.map((breadcrumb, index) => (index !== breadcrumbs.length - 1 ? (
        <Link
          color="inherit"
          component={RouterLink}
          to={`/${breadcrumb.path}`}
          className={classes.link}
          key={breadcrumb.name}
        >
          {breadcrumb.name}
        </Link>
      ) : (
        <Typography color="textPrimary" className={classes.link} key={breadcrumb.name}>
          {breadcrumb.name}
        </Typography>
      )))}
    </BreadcrumbsComponent>
  );
}

Breadcrumbs.propTypes = {
  breadcrumbs: PropTypes.arrayOf(PropTypes.object).isRequired
};

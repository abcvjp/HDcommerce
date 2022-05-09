import { memo } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import Carousel from 'react-material-ui-carousel';

import { Link as RouterLink } from 'react-router-dom';
import { Link, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: '100%',
    maxHeight: 600,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  slide: {
    width: '100%',
    height: 500,
  }
}));

const HomeSlider = ({ slides }) => {
  const classes = useStyles();

  return (
    <div id="home-slider" className="root">
      <Carousel
        autoPlay
        stopAutoPlayOnHover
        swipe
        timeout={400}
        interval={4000}
        indicators={false}
        animation="slide"
        cycleNavigation
      >
        {
          slides.map((slide) => (
            <Link key={shortid()} component={RouterLink} to={slide.url}>
              <img
                className={classes.slide}
                alt={slide.imgAlt}
                src={slide.imgUrl}
              />
            </Link>
          ))
        }
      </Carousel>
    </div>
  );
};

HomeSlider.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.object)
};

export default memo(HomeSlider);

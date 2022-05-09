import { useState, memo } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import Carousel from 'react-material-ui-carousel';

import { Box, makeStyles } from '@material-ui/core';
import ProductImageViewer from './ProductImageViewer';

const useStyles = makeStyles((theme) => ({
  imgBlock: {
    maxWidth: 500,
    maxheight: 600,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  image: {
    width: '100%',
    maxHeight: '100%'
  },
  containerIndImg: {
    maxHeight: theme.spacing(12),
    maxWidth: theme.spacing(12),
    display: 'inline-block',
    marginRight: theme.spacing(1)
  },
  indImg: {
    maxWidth: '100%',
    maxHeight: '100%'
  },
  curIndImg: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'fill',
    border: '2px solid transparent',
    borderColor: 'black'
  }
}));

const ProductImages = ({ images }) => {
  const classes = useStyles();
  const [imgIndex, setImgIndex] = useState(0);
  const [isViewerOpen, setViewerOpen] = useState(false);

  const handleViewerClose = () => {
    setViewerOpen(false);
  };

  const handleViewerOpen = () => {
    setViewerOpen(true);
  };

  return (
    <div id="product-images">
      <Carousel
        index={imgIndex}
        autoPlay={false}
        timeout={300}
        indicators={false}
        next={() => {
          if (imgIndex === images.length - 1) {
            setImgIndex(0);
          } else setImgIndex(imgIndex + 1);
        }}
        prev={() => {
          if (imgIndex === 0) {
            setImgIndex(images.length - 1);
          } else setImgIndex(imgIndex - 1);
        }}
      >
        {
          images.map((image) => (
            <div
              key={shortid.generate()}
              className={classes.imgBlock}
            >
              { // eslint-disable-next-line
              <img
                className={classes.image}
                alt={image.alt}
                src={image.url}
                onClick={handleViewerOpen}
              />
              }
            </div>
          ))
        }
      </Carousel>

      <Box
        display="flex"
        justifyContent="center"
        mt={1}
      >
        {images.map((img, i) => (
          <div className={classes.containerIndImg} key={shortid.generate()}>
            {// eslint-disable-next-line
            <img
              className={i === imgIndex ? classes.curIndImg : classes.indImg}
              src={img.url}
              alt={img.alt}
              onClick={() => {
                setImgIndex(i);
              }}
            />
            }
          </div>
        ))}
      </Box>

      {isViewerOpen && (
      <ProductImageViewer
        initialIndex={imgIndex}
        images={images}
        handleClose={handleViewerClose}
      />
      )}
    </div>
  );
};

ProductImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object)
};

export default memo(ProductImages);

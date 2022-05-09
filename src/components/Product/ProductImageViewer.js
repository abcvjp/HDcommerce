import { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Modal } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    outline: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(3),
    wrap: 'nowrap',
  },
  img: {
    maxHeight: '90%'
  },
  navIcon: {
    fontSize: theme.spacing(8)
  },
  topRight: {
    alignSelf: 'flex-start',
    top: 0,
    right: 0,
    position: 'absolute'
  },
  closeIcon: {
    fontSize: theme.spacing(6)
  }
}));

const ProductImageViewer = ({
  initialIndex, images, handleClose
}) => {
  const classes = useStyles();
  const [curImgIndex, setCurImgIndex] = useState(initialIndex);

  const handleNext = () => {
    if (curImgIndex === images.length - 1) setCurImgIndex(0);
    else setCurImgIndex((prev) => prev + 1);
  };

  const handleBack = () => {
    if (curImgIndex === 0) setCurImgIndex(images.length - 1);
    else setCurImgIndex((prev) => prev - 1);
  };

  return (
    <Modal
      open
      onClose={handleClose}
    >
      <div className={classes.root}>
        <IconButton onClick={handleBack}>
          <ArrowBackIosIcon className={classes.navIcon} />
        </IconButton>

        <img
          className={classes.img}
          src={images[curImgIndex].url}
          alt={images[curImgIndex].alt}
          title={images[curImgIndex].title}
        />

        <IconButton onClick={handleNext}>
          <ArrowForwardIosIcon className={classes.navIcon} />
        </IconButton>

        <IconButton
          className={classes.topRight}
          onClick={handleClose}
        >
          <CloseIcon className={classes.closeIcon} />
        </IconButton>
      </div>
    </Modal>
  );
};
ProductImageViewer.propTypes = {
  initialIndex: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleClose: PropTypes.func.isRequired
};

export default ProductImageViewer;

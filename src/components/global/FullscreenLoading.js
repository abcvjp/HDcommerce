import { useSelector } from 'react-redux';
import { Modal, CircularProgress } from '@material-ui/core';

const FullScreenLoading = () => {
  const { isShown } = useSelector((state) => state.ui.fullscreenLoading);
  return (
    (
      <Modal
        open={isShown}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress color="inherit" />
      </Modal>
    )
  );
};

export default FullScreenLoading;

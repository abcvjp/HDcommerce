import { Helmet } from 'react-helmet';

import {
  Container,
  makeStyles, Typography,
} from '@material-ui/core';

import { APP_TITLE } from 'src/constants/appInfo';
import { useEffect, useState } from 'react';
import { orderApi } from 'src/utils/api';
import { useParams } from 'react-router';
import OrderDetail from 'src/components/Account/OrderDetail';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '80%',
  },
  title: {
    marginBlock: theme.spacing(3),
  },
}));

const OrderDetailPage = () => {
  const classes = useStyles();
  const { orderId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await orderApi.getOrderById(orderId);
        setData(response.data.data);
      } catch (error) {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
      }
    };

    fetch();
  }, []);

  return (
    <Container maxWidth="lg" className={classes.root}>

      <Helmet>
        <title>
          Order detail |
          {' '}
          {APP_TITLE}
        </title>
      </Helmet>

      {data && (
      <>
        <Typography variant="h5" className={classes.title}>{`Order detail #${data.code}`}</Typography>
        <OrderDetail order={data} />
      </>
      )}

    </Container>
  );
};

export default OrderDetailPage;

import { Helmet } from 'react-helmet';

import {
  Container,
  makeStyles, Paper, Tab, Tabs,
} from '@material-ui/core';

import { APP_TITLE } from 'src/constants/appInfo';
import { useEffect, useState } from 'react';
import theme from 'src/theme';
import { orderApi } from 'src/utils/api';
import OrderCard from './OrderCard';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%'
  },

  main: {

  },
  tabs: {
    // marginBottom: theme.spacing(2),
    marginTop: 0
  },
  order: {
    marginBlock: theme.spacing(2),
    padding: theme.spacing(2)
  },
  orderHead: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2)
  },
  orderTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing(2)
  }
}));

/* eslint-disable react/prop-types */

const orderStatus = {
  0: '',
  1: 'Creating',
  2: 'Pending',
  3: 'Handling',
  4: 'Completed',
  5: 'Canceled',
  6: 'Failed'
};

const MyOrders = () => {
  const classes = useStyles();
  const [tab, setTab] = useState(0);
  const [data, setData] = useState([]);

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  useEffect(() => {
    const fetchShippingMethods = async () => {
      try {
        const response = await orderApi.getAll({ status: orderStatus[tab] });
        setData(response.data.data.records);
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

    fetchShippingMethods();
  }, [tab]);

  return (
    <>
      <Helmet>
        <title>
          My Orders |
          {' '}
          {APP_TITLE}
        </title>
      </Helmet>
      <Container className={classes.root}>

        <Paper className={classes.tabs}>
          <Tabs
            variant="scrollable"
            scrollButtons="auto"
            textColor="primary"
            indicatorColor="secondary"
            centered
            value={tab}
            onChange={handleChangeTab}
            className={classes.tabs}
          >

            <Tab
              label="All"
              key={0}
            />
            <Tab
              label="Creating"
              key={1}
            />
            <Tab
              label="Pending"
              key={2}
            />
            <Tab
              label="Handling"
              key={3}
            />
            <Tab
              label="Completed"
              key={4}
            />
            <Tab
              label="Canceled"
              key={5}
            />
            <Tab
              label="Failed"
              key={6}
            />
          </Tabs>
        </Paper>

        {data.length > 0 && data.map((order) => (
          <OrderCard order={order} />
        ))}

      </Container>
    </>
  );
};

export default MyOrders;

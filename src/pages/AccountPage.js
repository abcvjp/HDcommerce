import { Helmet } from 'react-helmet';

import {
  Box,
  Container,
  Grid,
  makeStyles, Tab, Tabs, Typography,
} from '@material-ui/core';

import { APP_TITLE } from 'src/constants/appInfo';
import { useState } from 'react';
import { AccountCircle, EventNote } from '@material-ui/icons';
import MyOrders from 'src/components/Account/MyOrders';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '80%',
  },
  title: {
    marginBlock: theme.spacing(3),
  },
  main: {
    flexGrow: 1,
    display: 'flex',
    minHeight: '80%',
    width: '100%'
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  content: {
  }
}));

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}
/* eslint-disable react/prop-types */

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const AccountPage = () => {
  const classes = useStyles();
  const [tab, setTab] = useState(1);

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Container maxWidth="lg" className={classes.root}>

      <Helmet>
        <title>
          Account |
          {' '}
          {APP_TITLE}
        </title>
      </Helmet>

      <Typography variant="h5" className={classes.title}>Account</Typography>

      <div className={classes.main}>
        <Grid container>
          <Grid item xs={12} md={4} lg={3}>
            <Tabs
              orientation="vertical"
              variant="fullWidth"
              textColor="primary"
              indicatorColor="secondary"
              value={tab}
              onChange={handleChangeTab}
              className={classes.tabs}
            >

              <Tab
                label="My Profile"
                icon={<AccountCircle />}
                key={0}
                {...a11yProps(0)}
              />
              <Tab
                label="My Order"
                icon={<EventNote />}
                key={1}
                {...a11yProps(1)}
              />
            </Tabs>
          </Grid>
          <Grid item xs={12} md={8} lg={9} className={classes.content}>
            <TabPanel value={tab} index={0}>
              Item Two
            </TabPanel>
            <TabPanel value={tab} index={1}>
              <MyOrders />
            </TabPanel>
          </Grid>
        </Grid>
      </div>

    </Container>
  );
};

export default AccountPage;

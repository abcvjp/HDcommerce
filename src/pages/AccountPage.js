import { Helmet } from 'react-helmet';

import {
  Box,
  Container,
  makeStyles, Tab, Tabs, Typography,
} from '@material-ui/core';

import { APP_TITLE } from 'src/constants/appInfo';
import { useState } from 'react';
import { AccountCircle, EventNote } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '80%'
  },
  title: {
    marginBlock: theme.spacing(3),
  },
  main: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    minHeight: '80%',
    width: '100%'
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: '75%%'
  },
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
        <Tabs
          orientation="vertical"
          variant="standard"
          textColor="primary"
          indicatorColor="secondary"
          value={tab}
          onChange={handleChangeTab}
          aria-label="Vertical tabs example"
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
        <TabPanel value={tab} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={tab} index={1}>
          Item Two
        </TabPanel>
      </div>

    </Container>
  );
};

export default AccountPage;

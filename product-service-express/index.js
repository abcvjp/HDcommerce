const express = require('express');
const cors = require('cors');

const { httpLogger, logger } = require('./common/logger');
const errorHandler = require('./common/errorHandler');

require('dotenv').config();
const config = require('./config');

const app = express();

const corsConfig = config.get('cors');
app.use(
  cors({
    origin: corsConfig.whiteList ? corsConfig.whiteList : true,
    credentials: corsConfig.credentials
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(httpLogger);

app.get('/', (req, res) => {
  res.send('Hoai dep trai');
});

app.use(errorHandler);

const port = config.get('port');
app.listen(port, () => {
  logger.info(`${config.get('serviceName')} listening on port ${port}`);
});
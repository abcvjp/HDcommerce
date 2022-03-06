const morgan = require('morgan');
const json = require('morgan-json');
const logger = require('./logger');

const format = json({
  timestamp: ':date[clf]',
  client: ':remote-addr',
  method: ':method',
  url: ':url',
  status: ':status',
  contentLength: ':res[content-length]',
  responseTime: ':response-time'
});

const httpLogger = morgan(format, {
  stream: {
    write: (message) => {
      const {
        timestamp,
        client,
        method,
        url,
        status,
        contentLength,
        responseTime
      } = JSON.parse(message);

      logger.info(
        `HTTP Access Log: ${method} ${url} ${status} ${responseTime} ms - ${contentLength}`,
        {
          timestamp,
          client,
          method,
          url,
          status: Number(status),
          contentLength,
          responseTime: Number(responseTime)
        }
      );
    }
  }
});

module.exports = httpLogger;
const { logger } = require('./logger');

module.exports = function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(err);
  res.status(err.statusCode || 500);
  res.json({
    success: false,
    error: {
      message: err.message,
      details: err.details
    }
  });
  logger.error(err.message, {
    stack: err.stack,
    details: err.details
  });
};
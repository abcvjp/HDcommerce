const { createLogger, format, transports, config } = require('winston');

const environment = require('../../config').get('env');

const options = {
  combinedFile: {
    format: format.combine(format.timestamp(), format.json()),
    filename: './logs/combined.log',
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
	silent: environment === 'development'
  },
  errorFile: {
    level: 'error',
    format: format.combine(
      format.timestamp(),
      format.errors({ stack: true }),
      format.json()
    ),
    filename: './logs/error.log',
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
	silent: environment === 'development'
  },
  console: {
    level: 'info',
    format: format.combine(
      format.label({ label: 'DEBUG LOG' }),
      format.timestamp(),
      format.printf(({ level, message, label, timestamp }) => {
        return `${timestamp} [${label}] ${level}: ${message}`;
      }),
      format.colorize({ all: true })
    ),
    handleExceptions: true,
    json: false,
    colorize: true
  }
};

const logTransports = [
  new transports.File(options.combinedFile),
  new transports.File(options.errorFile)
];

if (environment !== 'production') {
  logTransports.push(new transports.Console(options.console));
}

const logger = createLogger({
  levels: config.npm.levels,
  transports: logTransports,
  exitOnError: false
});

module.exports = logger;
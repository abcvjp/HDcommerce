var convict = require('convict');

// add array format
convict.addFormat({
  name: 'array',
  validate: function (children, schema) {
    if (!Array.isArray(children)) {
      throw new Error('must be of type Array');
    }
  }
});

var config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  serviceName: {
	doc: 'Name of application/service.',
	format: String,
	default: 'Service',
	env: 'SERVICE_NAME'
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 5000,
    env: 'PORT',
    arg: 'port'
  },
  db: {
	type: {
      doc: 'Database type',
      format: String,
      default: 'mysql',
      env: 'DB_NAME'
    },
    host: {
      doc: 'Database host name/IP',
      format: '*',
      default: 'db',
      env: 'DB_HOST'
    },
    name: {
      doc: 'Database name',
      format: String,
      default: 'product-db',
      env: 'DB_NAME'
    },
    username: {
      doc: 'Database username',
      format: String,
      default: 'hoaideptrai',
      env: 'DB_USERNAME'
    },
    password: {
      doc: 'Database password',
      format: String,
      sensitive: true,
      default: '123456',
      env: 'DB_PASSWORD'
    },
    pool: {
      max: {
        format: Number,
        default: 10
      },
      min: {
        format: Number,
        default: 0
      },
      acquire: {
        format: Number,
        default: 30000
      },
      idle: {
        format: Number,
        default: 10000
      }
    }
  },
  sequelize: {
    host: {
      doc: 'Database host name/IP',
      format: '*',
      default: 'db',
      env: 'DB_HOST'
    },
    database: {
      doc: 'Database name',
      format: String,
      default: 'product',
      env: 'DB_NAME'
    },
    username: {
      doc: 'Database username',
      format: String,
      default: 'hoaideptrai',
      env: 'DB_USERNAME'
    },
    password: {
      doc: 'Database password',
      format: String,
      sensitive: true,
      default: '123456',
      env: 'DB_PASSWORD'
    },
    dialect: {
      doc: 'Database type',
      format: String,
      default: 'mysql',
	  env: 'DB_TYPE'
    },
    ssl: {
      format: Boolean,
      default: false,
      nullable: true
    },
    dialectOptions: {
      ssl: {
        require: {
          format: Boolean,
          default: false
        }
      },
      decimalNumbers: {
        format: Boolean,
        default: true
      }
    }
  },
  redis: {
    host: {
      format: String,
      default: 'redis',
      env: 'REDIS_HOST'
    },
    port: {
      format: Number,
      default: 6379,
      env: 'REDIS_PORT'
    },
    password: {
      format: String,
      default: '123456',
      env: 'REDIS_PASSWORD'
    }
  },
  cors: {
	whiteList: {
      format: 'array',
	  nullable: true
    },
    credentials: {
      format: Boolean,
      default: true
    }
  },
  log: {
	enableLogFiles: {
		format: Boolean,
		default: false
	}
  },
  jwt: {
    secret: {
      format: String,
      default: 'Ysg$fG&DG',
      env: 'JWT_ACCESS_TOKEN_SECRET'
    },
    secret_options: {
      expiresIn: {
        format: String,
        default: '3d'
      }
    },
    refresh_secret: {
      format: String,
      default: 'Ysg$fG&DG',
      env: 'JWT_REFRESH_TOKEN_SECRET'
    },
    refresh_secret_options: {
      expiresIn: {
        format: String,
        default: '10d'
      }
    }
  }
});

// Load environment dependent configuration
var env = config.get('env');
config.loadFile('./config/' + env + '.json');

// Perform validation
config.validate({ allowed: 'strict' });

module.exports = config;
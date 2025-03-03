import bunyan from 'bunyan';
import config from '../config';

const logger = bunyan.createLogger({
  name: 'hono-app',
  level: config.environment === 'production' ? 'info' : 'debug',
  serializers: bunyan.stdSerializers,
});

export default logger;
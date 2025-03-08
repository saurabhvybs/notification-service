import bunyan from 'bunyan';
import fs from 'fs';
import path from 'path';

// Define log directory at the root level
const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Create Bunyan logger
const logger = bunyan.createLogger({
  name: 'app_logger',
  level: 'info',
  serializers: bunyan.stdSerializers,
  streams: [
    { level: 'info', stream: process.stdout }, // Console output
    { level: 'error', path: path.join(logDir, 'error.log') }, // Error log file
    { level: 'info', path: path.join(logDir, 'app.log') }, // General log file
  ],
});

export default logger;

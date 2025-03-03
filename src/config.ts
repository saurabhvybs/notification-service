import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

interface Config {
  port: string | number;
  environment: string;
  kafka: {
    enabled: boolean;
    brokers: string[];
    topic: string;
  };
  cors: {
    origins: string[];
  };
}

const config: Config = {
  port: process.env.PORT || 3000,
  environment: process.env.NODE_ENV || 'development',
  kafka: {
    enabled: process.env.KAFKA_ENABLED === 'true',
    brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),
    topic: process.env.KAFKA_TOPIC || 'hono-app-topic',
  },
  cors: {
    origins: (process.env.ALLOWED_ORIGINS || 'http://localhost:3000').split(','),
  },
};

export default config;